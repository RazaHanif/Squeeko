import prisma from '../db/prisma'
import Stripe from 'stripe'
import config from '../config/index'

const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, APP_URL } = config

const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2025-07-30.basil'
})


const toCents = (amt) => Math.round(Number(amt) * 100)

// uses platform's assumed rate (e.g. 2.9% + 30c).
const calculateApplicationFeeCents = (amountCents) => {
   const percent = 0.029
   const flatCents = 30
   return Math.round(amountCents * percent) + flatCents
}

export const onboardCenter = async (req, res, next) => {
    try {
        const { center_id } = req.body
        
        const center = await prisma.center.findUnique({
            where: {
                id: center_id
            }
        })
        
        if (!center.stripe_id) {
            const account = await stripe.accounts.create({
                type: 'express',
                country: 'CA',
                capabilities: {
                    card_payments: { requested: true },
                    transfers: { requested: true }
                }
            })
            
            await prisma.center.update({
                where: {
                    id: center_id
                },
                data: {
                    stripe_id: account.id,
                    stripe_status: account.requirements?.current_status || null
                }
            })
        }
        
        const accountLink = await stripe.accountLinks.create({
            account: center.stripe_id,
            refresh_url: `${APP_URL}/stripe/onboard/refresh`,
            return_url: `${APP_URL}/stripe/onboard/complete`,
            type: 'account_onboarding'
        })

        return res.status(200).json({
            success: true,
            data: { url: accountLink.url },
            error: null
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: {},
            error: { message: err.message }
        })
    }
}

export const createParentStripeId = async (req, res) => {
    try {
        const { email, name, parent_id } = req.body

        const customer = await stripe.customers.create({
            email,
            name,
            metadata: {
                parent_id
            }
        })

        await prisma.parent.update({
            where: {
                id: parent_id
            },
            data: {
                stripe_id: customer.id
            }
        })

        const setupIntent = await stripe.setupIntents.create({
            customer: customer.id
        })

        return res.status(200).json({
            success: true,
            data: { client_secret: setupIntent.client_secret },
            error: null
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: {},
            error: { message: err.message }
        })
    }
}

export const attachPaymentMethod = async (req, res) => {
    try {
        const { parent_id, payment_method_id } = req.body

        const parent = await prisma.parent.findUnique({
            where: {
                id: parent_id
            }
        })

        await stripe.paymentMethods.attach(
            payment_method_id,
            { customer: parent.stripe_id}
        )

        await stripe.customers.update(
            parent.stripe_id,
            { invoice_settings: {
                default_payment_method: payment_method_id
            }}
        )

        await prisma.parent.update({
            where: {
                id: parent_id
            },
            data: {
                payment_method_id
            }
        })

        return res.status(200).json({
            success: true,
            data: {},
            error: null
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: {},
            error: { message: err.message }
        })
    }
}

export const createOneTimeCheckoutSession = async (req, res) => {
    try {
        const { parent_id, center_id, amount, description } = req.body

        const center = await prisma.center.findUnique({
            where: {
                id: center_id
            }
        })

        const parent = await prisma.parent.findUnique({
            where: {
                id: parent_id
            }
        })

        const amount_cents = toCents(parseFloat(amount))
        const application_fee = calculateApplicationFeeCents(amount_cents)

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            customer: parent.stripe_id,
            line_items: [{ price_data: { currency: 'cad', product_data: { name: description }, unit_amount: amount_cents }, quantity: 1 }],
            payment_intent_data: { application_fee_amount: application_fee},
            transfer_data: { destination: center.stripe_id },
            success_url: `${APP_URL}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${APP_URL}/payments/cancel`
        })

        await prisma.invoice.create({
            data: {
                parent_id,
                center_id,
                amount,
                description,
                stripe_checkout_session_id: session.id,
                paid: false
            }
        })

        return res.status(200).json({
            success: true,
            data: { url: session.url },
            error: null
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: {},
            error: { message: err.message }
        })
    }
}

/**
 * createSubscriptionForParent(req, res)
 * Purpose: create a recurring subscription (tuition) for a parent that charges the parent monthly and routes payouts to the center.
 * Steps (MVP, implementing platform-created subscription with transfer destination):
 *   0. Preconditions: parent.stripe_id exists, center.stripe_id exists, center has defined `price` (amount) in Squeeko (either a shared price or per-parent price).
 *   1. If you don't already have a Stripe Price object for this center's tuition, create one on the platform account:
 *        price = await stripe.prices.create({ unit_amount: amountCents, currency: 'cad', recurring: { interval: 'month' }, product: productIdOrProductData })
 *      Save price.id to DB (e.g., Center.tuition_price_id).
 *   2. Create the subscription:
 *      - Create subscription with `customer = parent.stripe_id`
 *      - include `items: [{ price: price.id, quantity: 1 }]`
 *      - include `transfer_data: { destination: center.stripe_id }` so the charge transfers to center (destination charge)
 *      - include `application_fee_percent: percent` if you want to collect a % (useful if you accept percent instead of cents). For 2.9% set ~2.9 (note: this is percent only and doesn't include flat cents).
 *   3. Save subscription.id and status to your DB in a Subscription table (store next_billing, status)
 *   4. If you need to include a fixed flat fee (e.g., $0.30) you have two options:
 *      - Add an invoice_item for the flat fee each billing cycle programmatically (listen to `invoice.created` webhook and create invoice item for flat cents)
 *      - Or approximate by adding a small percent adjustment. For exact cent coverage use `invoice.created` hook to add invoice items (explained below).
 *
 * Caveats:
 *   - Stripe's subscription API supports `transfer_data.destination` for destination charges. See docs. :contentReference[oaicite:9]{index=9}
 *   - `application_fee_percent` is available for subscriptions (Connect) but it's percent-only. Use invoice hooks to handle flat cents reliably. :contentReference[oaicite:10]{index=10}
 */
export const createSubscriptionForParent = async (req, res) => {
// 1. parse parentId, centerId, price override if present
// 2. ensure parent.stripe_id && center.stripe_id
// 3. if no price.id exist for center -> create stripe.product + stripe.price and save price.id on center
// 4. subscription = await stripe.subscriptions.create({
//      customer: parent.stripe_id,
//      items: [{ price: center.tuition_price_id }],
//      expand: ['latest_invoice.payment_intent'],
//      transfer_data: { destination: center.stripe_id },
//      // optional: application_fee_percent: 2.9
//    })
// 5. await prisma.subscription.create({ data: { parent_id, center_id, stripe_subscription_id: subscription.id, status: subscription.status }})
// 6. res.json({ subscription_id: subscription.id, status: subscription.status })
    try {
        const { parent_id, center_id } = req.body
        
        const parent = await prisma.parent.findUnique({
            where: {
                id: parent_id
            },
            include: {
                children: true
            }
        })

        const center = await prisma.center.findUnique({
            where: {
                id: center_id
            }
        })

        if (!parent.children || 
            parent.children.length === 0 || 
            parent.children.every(
                child => !child.tuition || 
                child.tuition === 0
            )
        ) {
            return res.status(500).json({
                sucess: false,
                data: {},
                error: { 
                    message: 'No tuition amounts available for this parent' 
                }
            })
        }

        let totalTuition = 0
        for (let i = 0; i < parent.children.length; i++) {
            totalTuition += parent.children[i].tuition
        }

        const amountInCents = toCents(totalTuition)

        const price = await stripe.prices.create(
            {
                unit_amount: amountInCents,
                currency: 'cad',
                recurring: { interval: 'month' },
                product_data: {
                    name: `Monthly Tuition - ${ center.name }`
                },
                metadata: {
                    center_id: center.id,
                    parent_id: parent.id
                }
            }, {
                stripeAccount: center.stripe_id
            }        
        )

        const subscription = await stripe.subscriptions.create(
            {
                customer: parent.stripe_id,
                items: [{
                    price: price.id
                }],
                expand: [ 'latest_invoice.payment_intent' ],
                transfer_data: {
                    destination: center.stripe_id
                },
                on_behalf_of: center.stripe_id,
                metadata: {
                    parent_id: parent.id,
                    center_id: center.id,
                    tuition_breakdown: JSON.stringify(
                        parent.children.map(child => ({
                            child_id: child.id,
                            tuition: child.tuition
                        }))
                    )
                }
            }, {
                stripeAccount: center.stripe_id
            }
        )

        return res.status(200).json({
            success: true,
            data: { subscription, price },
            error: null
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: {},
            error: { message: err.message }
        })
    }
}

/**
 * updateSubscriptionQuantity(req, res)
 * Purpose: update subscription item quantity (useful if you bill per-child and need to change quantity when child count changes).
 * Steps:
 *   1. Accept subscriptionId and newQuantity
 *   2. Use stripe.subscriptionItems.update(subscriptionItemId, { quantity: newQuantity })
 *   3. Optionally prorate or set proration_behavior
 */
export const updateSubscriptionQuantity = async (req, res) => {
// 1. find subscription by id in DB
// 2. pick subscription.items[0].id or saved subscription_item_id in DB
// 3. await stripe.subscriptionItems.update(subscription_item_id, { quantity: newQuantity, proration_behavior: 'create_prorations' })
// 4. update DB record if needed
// 5. res.json({ ok: true })
    try {    
        return res.status(200).json({
            success: true,
            data: { },
            error: null
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: {},
            error: { message: err.message }
        })
    }
}

/**
 * cancelSubscription(req, res)
 * Purpose: cancel a parent's subscription (immediately or at period end)
 * Steps:
 *   1. Accept subscriptionId and cancelAtPeriodEnd flag
 *   2. Call stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true }) or stripe.subscriptions.del(subscriptionId) for immediate
 *   3. Update DB subscription status
 */
export const cancelSubscription = async (req, res) => {
// 1. read subscriptionId, cancelFlag
// 2. if cancelFlag => await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true })
//    else await stripe.subscriptions.del(subscriptionId)
// 3. update DB subscription row status
    try {    
        return res.status(200).json({
            success: true,
            data: { },
            error: null
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: {},
            error: { message: err.message }
        })
    }
}

/**
 * stripeWebhook(req, res)
 * Purpose: single webhook endpoint to receive & verify Stripe events (Checkout, invoices, payments, account.updated, etc.)
 * Steps:
 *   1. Get raw body and stripe-signature header
 *   2. Call stripe.webhooks.constructEvent(payload, sig, STRIPE_WEBHOOK_SECRET) to verify signature
 *   3. Switch on event.type:
 *      - 'checkout.session.completed' => fetch session, mark invoice/one-time payment paid in DB, record paymentIntent id, expand latest_charge.balance_transaction if you want fee details
 *      - 'invoice.payment_succeeded' => mark subscription invoice paid in DB, update subscription.next_billing_date
 *      - 'invoice.payment_failed' => notify center/parent (email/notification)
 *      - 'payment_intent.succeeded' => optionally expand charge.balance_transaction to get exact Stripe fee and store it for reconciliation
 *      - 'account.updated' => update center.stripe_status in DB (check verification status)
 *      - 'charge.refunded' / 'charge.dispute.created' => handle refunds & disputes
 *   4. Always respond 200 quickly after queuing any heavier work
 *
 * Notes:
 *   - Always verify signature using `stripe.webhooks.constructEvent` with your webhook secret. :contentReference[oaicite:11]{index=11}
 *   - To get the exact Stripe fee for a charge, expand `payment_intent.latest_charge.balance_transaction` or retrieve the Charge and expand `balance_transaction`. See docs. :contentReference[oaicite:12]{index=12}
 */
export const stripeWebhook = async (req, res) => {
// 1. raw = req.rawBody (ensure Express collects raw body for webhook route)
// 2. try { event = stripe.webhooks.constructEvent(raw, sig, STRIPE_WEBHOOK_SECRET) } catch(e) { return res.status(400).send('invalid webhook') }
// 3. switch (event.type) {
//     case 'checkout.session.completed':
//       // session = event.data.object
//       // retrieve session with expand to get payment_intent if needed
//       // mark invoice in DB as paid and save paymentIntent.id / charge id
//       break
//     case 'invoice.payment_succeeded':
//       // invoice = event.data.object
//       // mark subscription invoice paid in DB, update subscription row
//       break
//     case 'payment_intent.succeeded':
//       // expand latest_charge.balance_transaction to read stripe fees and record them for reconciliation
//       break
//     case 'account.updated':
//       // update center.stripe_status (requirements, etc.)
//       break
//   }
// 4. res.json({ received: true })
    try {    
        return res.status(200).json({
            success: true,
            data: { },
            error: null
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: {},
            error: { message: err.message }
        })
    }
}

/**
 * small helper: createOrGetPriceForCenter(centerId, amount)
 * Purpose: create a Stripe Product+Price for the center's tuition (if not already present) and save price id in DB.
 * Steps:
 *   1. Check center.tuition_price_id in DB
 *   2. If exists return it
 *   3. Create product & price in platform account:
 *        prod = await stripe.products.create({ name: `${center.name} tuition` })
 *        price = await stripe.prices.create({ product: prod.id, unit_amount: amountCents, currency: 'cad', recurring: { interval: 'month' } })
 *   4. Save price.id into center row
 *   5. return price.id
 *
 * Note: alternative is creating the product/price directly in the connected account. Both are valid patterns — choose one and stay consistent. If you create prices on the platform and use `transfer_data.destination` on charges/subscriptions, the money will still be transferred to the connected account. See docs on destination charges. :contentReference[oaicite:13]{index=13}
 */
export const createOrGetPriceForCenter = async (centerId, amount) => {
// 1. center = await prisma.center.findUnique(...)
// 2. if center.tuition_price_id return it
// 3. prod = await stripe.products.create({ name:`${center.name} tuition` })
// 4. price = await stripe.prices.create({ product: prod.id, unit_amount: toCents(amount), currency: 'cad', recurring: { interval: 'month' }})
// 5. await prisma.center.update({ where: { id: centerId }, data: { tuition_price_id: price.id }})
// 6. return price.id
    try {    
        return res.status(200).json({
            success: true,
            data: { },
            error: null
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: {},
            error: { message: err.message }
        })
    }
}

/* -------------------------
Quick implementation checklist / TODOs
------------------------- */
// - Install stripe npm package and require(config) at top
// - Add routes and wire these controller functions (POST /stripe/center/onboard, /stripe/parent/create-customer, /stripe/checkout, /stripe/subscribe, /stripe/webhook)
// - Ensure Express exposes raw body for webhook route: app.post('/stripe/webhook', express.raw({ type: 'application/json' }), stripeWebhook)
// - Add DB columns: Center.stripe_id, Center.stripe_status, Center.tuition_price_id (optional),
//                     Parent.stripe_id, Parent.payment_method_id,
//                     Subscription model: { id, parent_id, center_id, stripe_subscription_id, status, next_billing_at }
// - Add env vars: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, APP_URL
// - Test locally with `stripe listen` + CLI, and thoroughly test Connect flows (onboarding, transfers). Use test accounts.
// - For exact fee matching: do not rely solely on pre-calculated applicationFee; instead expand the charge's balance_transaction in webhooks and reconcile actual Stripe fees. :contentReference[oaicite:14]{index=14}


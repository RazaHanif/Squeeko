import prisma from '../db/prisma'
import config from '../config/index'


/* 
TO GET PARENT STRIPE ID USE

const parent_stripe_id = getParentById(parent_id).stripe_id

*/

// Get all pending invoices for a center
export const getAllInvoices = async (req, res, next) => {
    try {
        const { center_id } = req.body

        if (!center_id) {
            return res.status(400).json({
                error: 'Invalid Center ID'
            })
        }

        const invoices = await prisma.invoice.findMany({
            where: {
                center_id: center_id,
                paid: false
            },

        })

        if (invoices.length === 0) {
            return res.status(404).json({
                error: `No active invoices found for center ${ center_id }`
            })
        }

        return res.status(200).json({
            success: true,
            data: { invoices },
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

// Get specific invoice by invoice id
export const getInvoiceByID = async (req, res, next) => {
    try {
        const invoice_id = req.body.invoice_id

        const invoice = await prisma.invoice.findUnique({
            where: {
                id: invoice_id
            }
        })

        if (!invoice) {
            return res.status(404).json({
                error: `No invoice found with id ${invoice_id}`
            })
        }

        return res.status(200).json({
            success: true,
            data: { invoice },
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



// Get all pending invoices for a parent
export const getAllInvoicesForParentId = async (req, res, next) => {
    try {
        const parent_id = req.body.parent_id

        const invoices = await prisma.invoice.findUnique({
            where: {
                id: parent_id,
                paid: false
            }
        })

        if (invoices.length === 0) {
            return res.status(404).json({
                error: `No pending invoices found for parent id ${parent_id}`
            })
        }

        return res.status(200).json({
            success: true,
            data: { invoices },
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

// Create new invoices
// Will need to come back to this when doing stripe integration
export const createNewInvoice = async (req, res, next) => {
    try {
        const { center_id, parent_id, amount, description, due_date } = req.body

        // Validate each of the vars

        // Create Stripe Invoice

        // Figure out if i can auto at the duedate run finalizeInvoice()

        // Return success
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

// Finalize invoices for a given customer
export const finalizeInvoice = async (req, res, next) => {
        try {
        const { invoice_id} = req.body

        // Validate invoice and see if it has been paid already

        // Finalize Invoice with Stripe

        // Return success
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


// Get all invoice history for center
export const getAllInvoiceHistory = async (req, res, next) => {
    try {
        const { center_id } = req.body

        if (!center_id) {
            return res.status(400).json({
                error: 'Invalid Center ID'
            })
        }

        const invoices = await prisma.invoice.findMany({
            where: {
                center_id: center_id,
            },
        })

        if (invoices.length === 0) {
            return res.status(404).json({
                error: `No invoices found for center ${ center_id }`
            })
        }

        return res.status(200).json({
            success: true,
            data: { invoices },
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

// Get all invoice history for parent
export const getAllInvoiceHistoryForParentId = async (req, res, next) => {
    try {
        const parent_id = req.body.parent_id

        const invoices = await prisma.invoice.findUnique({
            where: {
                id: parent_id
            }
        })

        if (invoices.length === 0) {
            return res.status(404).json({
                error: `No invoices found for parent id ${parent_id}`
            })
        }

        return res.status(200).json({
            success: true,
            data: { invoices },
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

// Make a one time payment
export const makePayment = async (req, res, next) => {
    try {
        // Implement Stripe Invoice Pipeline
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

// Create a recurring payment
export const makeRecurringPayment = async (req, res, next) => {
    try {
        // Implement Stripe Invoice Pipeline 
        // See if this can be used to auto charge when an invoice hits its due date
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

// Stripe Webhook
export const stripeWebhook = async (req, res, next) => {
    try {

        // Ya brother you dont need me to tell you what to do here.
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
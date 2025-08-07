import prisma from '../db/prisma'
import config from '../config/index'


// Get all invoices for a center
export const getAllInvoices = async (req, res, next) => {
    try {
        const { center_id } = req.body

        if (!center_id) {
            return res.status(400).json({
                error: 'Invalid Center ID'
            })
        }

        const invoices = await prisma.billing.findMany({
            where: {
                center_id: center_id
            },
        })

        if (invoices.length === 0) {
            return res.status(404).json({
                error: `No invoices found for center ${ center_id }`
            })
        }

        return res.status(200).json({
            invoices
        })
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}

// Get specific invoice by invoice id
export const getInvoiceByID = async (req, res, next) => {
    try {
        const invoice_id = req.body.invoice_id

        const invoice = await prisma.billing.findUnique({
            where: {
                id: invoice_id
            }
        })

        
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}



// Get all invoices for a parent
export const getAllInvoicesForParentId = async (req, res, next) => {
    try {
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// Create new invoices
export const createNewInvoice = async (req, res, next) => {
    try {
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}


// Get all invoice history for center
export const getAllInvoiceHistory = async (req, res, next) => {
    try {
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// Get all invoice history for parent
export const getAllInvoiceHistoryForParentId = async (req, res, next) => {
    try {
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// Make a one time payment
export const makePayment = async (req, res, next) => {
    try {
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// Create a recurring payment
export const makeRecurringPayment = async (req, res, next) => {
    try {
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}


// Get parents stripe Id
export const getStripeIdForParentId = async (req, res, next) => {
    try {
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}


// Stripe Webhook
export const stripeWebhook = async (req, res, next) => {
    try {
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

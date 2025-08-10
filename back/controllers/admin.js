import prisma from '../db/prisma'
import config from '../config/index'

// Get all center info
// Should only be reachable by the center supervisor
export const stats = async (req, res, next) => {
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

// Update fees, hours, supervisor status
export const settings = async (req, res, next) => {
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

// Create center
export const createCenter = async (req, res, next) => {
    try {
        // Literally logic to create a center
        // But also add Stripe Billing Logic
        // ....oh i might need to rework the db to include Billing info too, yikes
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
import prisma from '../db/prisma'
import config from '../config/index'

// Get all center info
// Should only be reachable by the center supervisor
export const stats = async (req, res, next) => {
    try {
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// Update fees, hours, supervisor status
export const settings = async (req, res, next) => {
    try {
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}
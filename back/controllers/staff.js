import prisma from '../db/prisma'
import { staffSafeSelect } from '../utils/prismaSelects'

import config from '../config/index'


// Get all staff for a given center
export const getAllStaff = async (req, res, next) => {
    try {
        const centerId = req.body.centerId

        if (!centerId) {
            return res.status(400).json({
                error: 'Invalid Center ID'
            })
        }

        const center = prisma.staff.findMany({
            where: {
                centerId: centerId
            },
            select: staffSafeSelect
        })

        if (!center) {
            return res.status(404).json({
                error: 'No Center found'
            })
        }

        return res.status(200).json({
            staff: center.staff
        })
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// Get a specific staff by user.id
export const getStaffById = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// Update a specific staff by user.id
export const updateStaffById = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// Delete a specific staff by user.id
export const deleteStaffById = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}


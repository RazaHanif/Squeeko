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

        const staff = prisma.staff.findMany({
            where: {
                centerId: centerId
            },
            select: staffSafeSelect
        })

        if (!staff) {
            return res.status(404).json({
                error: `No staff found for center ${centerId}`
            })
        }

        return res.status(200).json({
            staff: staff
        })
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// Get a specific staff by staff.id
export const getStaffById = async (req, res, next) => {
    try {
        let staffId = req.params.staffId

        try {
            staffId = parseInt(staffId)
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                error: 'Invalid Staff ID'
            })
        }

        if (!staffId) {
            return res.status(400).json({
                error: 'Invalid Staff ID'
            })
        }

        const staff = await prisma.staff.findUnique({
            where: {
                id: staffId
            },
            select: staffSafeSelect
        })

        if (!staff) {
            return res.status(404).json({
                error: `No staff found with id ${staffId}`
            })
        }

        return res.status(200).json({
            staff: staff
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// Update a specific staff by staff.id
export const updateStaffById = async (req, res, next) => {
    try {
        let staffId = req.params.staffId

        try {
            staffId = parseInt(staffId)
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                error: 'Invalid Staff ID'
            })
        }

        if (!staffId) {
            return res.status(400).json({
                error: 'Invalid Staff ID'
            })
        }

        const updateStaff = prisma.staff.update({
            where: {
                id: staffId
            },
            data: {
                
            }
        })

        return res.status(200).json({
            staff: staff
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// Delete a specific staff by staff.id
export const deleteStaffById = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}


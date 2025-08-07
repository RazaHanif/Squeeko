import prisma from '../db/prisma'
import config from '../config/index'
import { validateName } from '../utils/validate'
const { ChildSex } = require('@prisma/client')

// Get all children for a given center
export const getAllChildren = async (req, res, next) => {
    try {
        const { center_id } = req.body

        const children = await prisma.child.findMany({
            where: {
                center_id: center_id
            }
        })

        if (children.length === 0) {
            return res.status(404).json({
                error: `No children found for center ${ center_id }`
            })
        }

        return res.status(200).json({
            children
        })
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}

// Get a specific child by id
export const getChildById = async (req, res, next) => {
    try {
        const { child_id } = req.body

        const child = await prisma.child.findUnique({
            where: {
                id: child_id
            }
        })

        if (!child) {
            return res.status(404).json({
                error: `No child found with id ${child_id}`
            })
        }

        return res.status(200).json({
            child
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}

// Update a specific child by id
export const updateChildById = async (req, res, next) => {
    try {
        const session = await auth.api.getSession({ req })
        if (!session || session.user.role !== 'SUPERUSER') {
            return res.status(403).json({
                error: 'Forbidden'
            })
        }

        const updates = {}
        const input = req.body
        
        const current = await prisma.child.findUnique({
            where: {
                id: input.child_id
            }
        })

        if (input.first_name && input.first_name !== current.first_name) {
            if (!validateName(input.first_name))
            updates.first_name = input.first_name
        }

        if (input.middle_name && input.middle_name !== current.middle_name) {
            if (!validateName(input.middle_name))
            updates.middle_name = input.middle_name
        }

        if (input.last_name && input.last_name !== current.last_name) {
            if (!validateName(input.last_name))
            updates.last_name = input.last_name
        }
        
        if (input.preferred_name && input.preferred_name !== current.preferred_name) {
            if (!validateName(input.preferred_name))
            updates.preferred_name = input.preferred_name
        }

        if (input.dob && new Date(input.dob).toISOString() !== current.dob.toISOString()) {
            updates.dob = new Date(input.dob)
        }

        if (!Object.values(ChildSex).includes(input.gender)) {
            return res.status(400).json({
                error: 'Invalid Gender'
            })
        }

        if (input.gender && input.gender !== current.gender) {
            updates.gender = input.gender
        }

        if (Object.keys(updates).length > 0) {
            const updatedParent = await prisma.staff.update({
                where: {
                    id: staff_id
                },
                data: updates,
            })

            return res.status(200).json({
                staff: updatedParent
            })
        } else {
            return res.status(200).json({
                message: 'No changes made'
            })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}

// Delete a specific child by id
export const deleteChildById = async (req, res, next) => {
    try {
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}


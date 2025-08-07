import prisma from '../db/prisma'
import config from '../config/index'


// Get all parents for a given center
export const getAllParents = async (req, res, next) => {
    try {
        const { center_id } = req.body

        const parents = await prisma.parent.findMany({
            where: {
                center_id: center_id
            }
        })

        if (parents.length === 0) {
            return res.status(404).json({
                error: `No parents found for center ${ center_id }`
            })
        }

        return res.status(200).json({
            parents
        })
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}

// Get a specific parent by id
export const getParentById = async (req, res, next) => {
    try {
        const { parent_id } = req.body

        const parent = await prisma.parent.findUnique({
            where: {
                id: parent_id
            }
        })

        if (!parent) {
            return res.status(404).json({
                error: `No parent found with id ${parent_id}`
            })
        }

        return res.status(200).json({
            parent
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}

// Update a specific parent by id
export const updateParentById = async (req, res, next) => {
    try {
        const session = await auth.api.getSession({ req })
        if (!session || session.user.role !== 'SUPERUSER') {
            return res.status(403).json({
                error: 'Forbidden'
            })
        }

        const updates = {}
        const input = req.body
        
        const current = await prisma.parent.findUnique({
            where: {
                id: input.parent_id
            }
        })


        if (input.address && input.address !== current.address) {
            updates.address = input.address
        }

        if (input.phone_number && input.phone_number !== current.phone_number) {
            if (!validatePhone(input.phone_number))
            updates.phone_number = input.phone_number
        }

        if (input.alt_phone_number && input.alt_phone_number !== current.alt_phone_number) {
            if (!validatePhone(input.alt_phone_number))
            updates.alt_phone_number = input.alt_phone_number
        }

        if (input.employer && input.employer !== current.employer) {
            updates.employer = input.employer
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

// Delete a specific parent by id
export const deleteParentById = async (req, res, next) => {
    try {
        const session = await auth.api.getSession({ req })
        if (!session || session.user.role !== 'SUPERUSER') {
            return res.status(403).json({
                error: 'Forbidden'
            })
        }

        const { parent_id } = req.body

        if (!parent_id) {
            return res.status(400).json({
                error: 'Invalid Parent ID'
            })
        }

        const deletedParent = await prisma.parent.delete({
            where: {
                id: parent_id
            }
        })

        return res.status(200).json({
            deletedParent
        })
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}

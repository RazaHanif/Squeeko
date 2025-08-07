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
            error: `Error: ${err}`
        })
    }
}

// Get a specific parent by id
export const getParentById = async (req, res, next) => {
    try {
        const parent_id = req.body.parent_id

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
            error: `Error: ${err}`
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
        
        const current = await prisma.staff.findUnique({
            where: {
                id: staff_id
            }
        })

        const updates = {}
        const input = req.body

        if (input.address && input.address !== current.address) {
            updates.address = input.address
        }

        if (input.phone_number && input.phone_number !== current.phone_number) {
            if (!validatePhone(input.phone_number))
            updates.phone_number = input.phone_number
        }

        if (!Object.values(Position).includes(input.position)) {
            return res.status(400).json({
                error: 'Invalid Position'
            })
        }

        if (input.position && input.position !== current.position) {
            updates.position = input.position
        }

        if (input.cpr_date && new Date(input.cpr_date).toISOString() !== current.cpr_date.toISOString()) {
            updates.cpr_date = new Date(input.cpr_date)
        }

        if (input.ece_date && new Date(input.ece_date).toISOString() !== current.ece_date.toISOString()) {
            updates.ece_date = new Date(input.ece_date)
        }

        if (input.tb_date && new Date(input.tb_date).toISOString() !== current.tb_date.toISOString()) {
            updates.tb_date = new Date(input.tb_date)
        }

        if (input.police_check_date && new Date(input.police_check_date).toISOString() !== current.police_check_date.toISOString()) {
            updates.police_check_date = new Date(input.police_check_date)
        }

        if (input.offense_declaration_date && new Date(input.offense_declaration_date).toISOString() !== current.offense_declaration_date.toISOString()) {
            updates.offense_declaration_date = new Date(input.offense_declaration_date)
        }

        if (Object.keys(updates).length > 0) {
            const updateStaff = await prisma.staff.update({
                where: {
                    id: staff_id
                },
                data: updates,
            })

            return res.status(200).json({
                staff: updateStaff
            })
        } else {
            return res.status(200).json({
                message: 'No changes made'
            })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// Delete a specific parent by id
export const deleteParentById = async (req, res, next) => {
    try {
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

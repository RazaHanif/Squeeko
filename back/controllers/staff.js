import prisma from '../db/prisma'
import { staffSafeSelect } from '../utils/prismaSelects'
import { validateName, validatePhone, validateEmail } from '../utils/validate'


// Get all staff for a given center
export const getAllStaff = async (req, res, next) => {
    try {
        const { center_id } = req.body

        if (!center_id) {
            return res.status(400).json({
                error: 'Invalid Center ID'
            })
        }

        const staff = await prisma.staff.findMany({
            where: {
                center_id: center_id
            },
            select: staffSafeSelect
        })

        if (staff.length === 0) {
            return res.status(404).json({
                error: `No staff found for center ${ center_id }`
            })
        }

        return res.status(200).json({
            staff
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
        const staff_id = parseInt(req.body.staff_id)

        if (isNaN(staff_id)) {
            return res.status(400).json({
                error: 'Invalid Staff ID'
            })
        }

        const staff = await prisma.staff.findUnique({
            where: {
                id: staff_id
            },
            select: staffSafeSelect
        })

        if (!staff) {
            return res.status(404).json({
                error: `No staff found with id ${staff_id}`
            })
        }

        return res.status(200).json({
            staff
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// Update current user phone number
// Can only update phone number from here everything else is admin only
export const updateStaffPhoneNumberById = async (req, res, next) => {
    try {
        const session = await auth.api.getSession({ req })
        if (!session) return res.status(401).json({
            error: 'Unauthorized'
        })

        const { phone_number } = req.body

        if (!validatePhone(phoneNumber)) {
            return res.status(400).json({
                error: 'Invalid Phone Number'
            })
        }

        const updateStaff = prisma.staff.update({
            where: {
                id: session.user.id
            },
            data: {
                phone_number: phone_number
            },
            select: staffSafeSelect
        })

        return res.status(200).json({
            staff: updateStaff
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// Protected route only accesible by supervisor
// Change all staff data
export const updateStaffById = async (req, res, next) => {
    try {
        const session = await auth.api.getSession({ req })
        if (!session || session.user.role !== 'SUPERUSER') {
            return res.status(403).json({
                error: 'Forbidden'
            })
        }

        const staff_id = parseInt(req.body.staff_id)

        if (isNaN(staff_id)) {
            return res.status(400).json({
                error: 'Invalid Staff ID'
            })
        }

        const { address, phone_number, position, cpr_date, ece_date, tb_date, police_check_date, offense_declaration_date } = req.body

    } catch (err) {
        return res.status(500).json({
            error: err
        })
    }
}

// Delete a specific staff by staff.id
export const deleteStaffById = async (req, res, next) => {
    try {
        const staff_id = parseInt(req.body.staff_id)

        if (isNaN(staff_id)) {
            return res.status(400).json({
                error: 'Invalid Staff ID'
            })
        }

        const deleteStaff = await prisma.staff.delete({
            where: {
                id: staff_id
            }
        })

        if (!deleteStaff) {
            return res.status(404).json({
                error: `No staff found with id ${staff_id}`
            })
        }

        return res.status(200).json({
            message: `Staff with id ${staff_id} has been deleted`
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}


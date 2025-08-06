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
// Can only update, firstName, lastName, email, phoneNumber

// Will make seperate funcs for each renewal / expiry date
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

        // Should somehow validate the info (i guess)
        const { firstName, lastName, email, phoneNumber } = req.body

        if (!validateName(firstName) || !validateName(lastName)) {
            return res.status(400).json({
                error: 'Invalid Name'
            })
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                error: 'Invalid Email'
            })
        }

        if (!validatePhone(phoneNumber)) {
            return res.status(400).json({
                error: 'Invalid Phone Number'
            })
        }

        const updateStaff = prisma.staff.update({
            where: {
                id: staffId
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber
            },
            select: staffSafeSelect
        })

        if (!updateStaff) {
            return res.status(404).json({
                error: 'tbh idk, error updating'
            })
        }

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

// Delete a specific staff by staff.id
export const deleteStaffById = async (req, res, next) => {
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

        const deleteStaff = await prisma.staff.delete({
            where: {
                id: staffId
            }
        })

        if (!deleteStaff) {
            return res.status(404).json({
                error: `No staff found with id ${staffId}`
            })
        }

        return res.status(200).json({
            message: `Staff with id ${staffId} has been deleted`
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}


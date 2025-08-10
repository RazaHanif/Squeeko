import { prisma }from '../db/prisma'
import { validateEmail, validateName, validatePhone } from '../utils/validate'
import { auth } from '../auth'

export const signUp = async (req, res, next) => {
    try {
        const { email, password, first_name, middle_name, last_name, center_id, role, address, phone_number, alt_phone_number } = req.body

        // Validate Email
        const checkEmail = validateEmail(email)

        if(!checkEmail) { 
            return res.status(400).json({
                error: 'Invalid Email'
            })
        }

        // Validate Phone Number
        if (
            !validatePhone(phone_number) ||
            (alt_phone_number && !validatePhone(alt_phone_number))
        ) {
            return res.status(400).json({
                error: 'Invalid Phone Number'
            })
        }

        // Might be overkill for name checking
        if (
            !validateName(first_name) || 
            !validateName(last_name) || 
            (middle_name && !validateName(middle_name)) 
        ) {
            return res.status(400).json({
                error: 'Invalid Name'
            })
        }

        // Create user with BetterAuth
        const { user } = await auth.api.signUpEmail({
            body: {
                email,
                password,
                first_name,
                middle_name: middle_name || null,
                last_name,
                role
            }
        })

        // Create Parent or Staff model
        if (role === 'PARENT') {
            await prisma.parent.create({
                data: {
                    user_id: user.id,
                    center_id,
                    address,
                    phone_number,
                    alt_phone_number: alt_phone_number || null,
                    employer: employer || null,
                    // add children and billing in seperate func
                }
            })
        }
        else if (role === 'STAFF') {
            await prisma.staff.create({
                data: {
                    user_id: user.id,
                    center_id,
                    address,
                    phone_number,
                    // will add cpr, ece, tb etc, dates in seperate func
                }
            })
        }

        return res.status(200).json({
            success: true,
            data: { user },
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

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body
        
        const session = await auth.api.signInEmail({
            body: { email, password}
        })

        return res.status(200).json({
            success: true,
            data: { session },
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

export const signOut = async (req, res, next) => {
    try {
        await auth.api.signOut({ req })

        return res.status(200).json({
            success: true,
            data: { message: 'Successfully logged out' },
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

export const updateName = async (req, res, next) => {
    try {
        const session = await auth.api.getSession({ req })
        if (!session) return res.status(401).json({
            error: 'Unauthorized'
        })

        const { first_name, middle_name, last_name } = req.body

        const updatedUser = await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                first_name,
                middle_name: middle_name || null,
                last_name
            }
        })

        return res.status(200).json({
            success: true,
            data: { updatedUser },
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

export const updatePassword = async (req, res, next) => {
    try {
        const session = await auth.api.getSession({ req })
        if (!session) {
            return res.status(401).json({
                error: 'Unauthorized'
            })
        }

        const { oldPassword, newPassword } = req.body

        const updatedUser = await auth.api.updatePassword({
            body: {
                user_id: session.user.id,
                oldPassword,
                newPassword
            }
        })

        return res.status(200).json({
            success: true,
            data: { message: 'Password successfully updated' },
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

// Just for mvp this is locked to superuser 
// Will create proper email link to reset later
export const adminResetPassword = async (req, res, next) => {
    try {
        const session = await auth.api.getSession({ req })
        if (!session || session.user.role !== 'SUPERUSER') {
            return res.status(403).json({
                error: 'Forbidden'
            })
        }
    
        const { user_id, new_password } = req.body
    
        await auth.api.updatePassword({
            body: {
                user_id,
                newPassword: new_password
            }
        })
    
        return res.status(200).json({
            success: true,
            data: { message: 'Password reset succesful' },
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

export const me = async (req, res, next) => {
    try {
        const session = await auth.api.getSession({ req })
        if (!session) {
            return res.status(401).json({
                error: 'Unauthorized'
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id
            },
            include: {
                parent: true,
                staff: true
            }
        })
        
        return res.status(200).json({
            success: true,
            data: { user },
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

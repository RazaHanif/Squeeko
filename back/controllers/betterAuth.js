import jwt from 'jsonwebtoken'
import { JsonWebTokenError } from 'jsonwebtoken'
import { prisma }from '../db/prisma'
import bcrypt from 'bcrypt'
import { validateDateTime, validateEmail, validateName, validatePhone } from '../utils/validate'
import { auth } from '../auth'

import config from '../config/index'

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

        res.status(201).json({ user })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body
        
        const session = await auth.api.signInEmail({
            body: { email, password}
        })

        res.status(200).json({ session })
    } catch (err) {
        console.log(err)
        res.status(401).json({
            error: 'Invalid email or password'
        })
    }
}

export const signOut = async (req, res, next) => {
    try {
        await auth.api.signOut({ req })
        res.status(200).json({
            message: 'Successfully logged out'
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
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

        res.status(200).json({ user })
        
    } catch (err) {
        res.status(500).json({
            error: err.message
        })       
    }
}


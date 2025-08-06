import jwt from 'jsonwebtoken'
import { JsonWebTokenError } from 'jsonwebtoken'
import { prisma }from '../db/prisma'
import bcrypt from 'bcrypt'
import { validateDateTime, validateEmail, validateName, validatePhone } from '../utils/validate'
import { auth } from '../auth'

import config from '../config/index'

export const signUp = async (req, res, next) => {
    try {
        const { email, password, first_name, middle_name, last_name, center_id, role, address, phone_number } = req.body

        // Validate Email
        const checkEmail = validateEmail(email)

        if(!checkEmail) { 
            return res.status(400).json({
                error: 'Invalid Email'
            })
        }

        // Might be overkill for name checking
        if (!validateName(first_name) || !validateName(last_name) || !validateName(middle_name)) {
            return res.status(400).json({
                error: 'Invalid Name'
            })
        }

        const { user } = await auth.api.signUp.email({
            body: {
                email,
                password,
                name,
                role
            }
        })

        if (role === 'PARENT') {
            await prisma.parent.create({
                data: {
                    user_id: user.id,
                    center_id: centerId
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export const signIn = async (req, res, next) => {

}
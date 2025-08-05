import jwt from 'jsonwebtoken'
import { JsonWebTokenError } from 'jsonwebtoken'
import { prisma }from '../db/prisma'
import bcrypt from 'bcrypt'
import { validateDateTime, validateEmail, validateName, validatePhone } from '../utils/validate'
import { auth } from '../auth'

import config from '../config/index'

export const signUp = async (req, res, next) => {
    try {
        const body = req.body

        // Validate Email
        const email = body.email
        const checkEmail = validateEmail(email)

        if(!checkEmail) { 
            return res.status(400).json({
                error: 'Invalid Email'
            })
        }

        // This feels wrong?
        // Should probably hash before storing even in a var
        const password = body.password
        
        // Might be overkill for name assingment
        const name = body.name

        if (!validateName(name)) {
            return res.status(400).json({
                error: 'Invalid Name'
            })
        }

        const response = await auth.api.signUpEmail({
            email,
            password,
            name,
        }, {
            onRequest: (ctx) => {
                // show on loading
            },
            onSuccess: (ctx) => {
                // Redirect to dashboard or sign in page
            },
            onError: (ctx) => {
                // display error
                console.log(ctx.error.message)
            }
        })
    } catch (err) {
        console.log(err)
    }
}

export const signIn = async (req, res, next) => {

}
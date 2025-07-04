import jwt from 'jsonwebtoken'
import { JsonWebTokenError } from 'jsonwebtoken'
import prisma from '../db/prisma'
import bcrypt from 'bcrypt'

import config from '../config/index'


// Get all staff for a given center
export const getAllStaff = async (req, res, next) => {
    try {
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// Get a specific staff by user.id
export const getStaffById = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// Update a specific staff by user.id
export const updateStaffById = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// Delete a specific staff by user.id
export const deleteStaffById = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}


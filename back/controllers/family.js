import prisma from '../db/prisma'
import config from '../config/index'

export const intake = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            data: { },
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


export const assignChildrenToParentById = async (req, res, next) => {
    try {
        // add child/children [] to a parents model
        return res.status(200).json({
            success: true,
            data: { },
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
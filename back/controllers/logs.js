import prisma from '../db/prisma'
import config from '../config/index'


// Staff uploads daily updates for children
export const updateDailyLog = async (req, res, next) => {
    try {
        switch (type) {
            case food:
                
                break;
            case nap:
                
                break;
            case mood:
                
                break;
            case bathroom:
                
                break;
            default:
                break;
        }
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

// Parent views daily log for today
export const viewDailyLog = async (req, res, next) => {
    try {
    // pull by child id
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

// Parent views all daily logs 
export const viewDailyLogHistory = async (req, res, next) => {
    try {
        // Pull by child id
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

// Staff updates attendance
export const updateAttendance = async (req, res, next) => {
    try {
    // pull by child id
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


// view all sign ins for today
export const getAttendanceForToday = async (req, res, next) => {
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

// view all attendance history
export const getAllAttendance = async (req, res, next) => {
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
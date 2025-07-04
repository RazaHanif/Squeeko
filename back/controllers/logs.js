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
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// Parent views daily log for today
export const viewDailyLog = async (req, res, next) => {
    try {
    // pull by child id
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// Parent views all daily logs 
export const viewDailyLogHistory = async (req, res, next) => {
    try {
        // Pull by child id
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// Staff updates attendance
export const updateAttendance = async (req, res, next) => {
    try {
    // pull by child id
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}


// view all sign ins for today
export const getAttendanceForToday = async (req, res, next) => {
    try {
    // pull by child id
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// view all attendance history
export const getAllAttendance = async (req, res, next) => {
    try {
    // pull by child id
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}
import prisma from '../db/prisma'
import config from '../config/index'

export const intake = async (req, res, next) => {
    try {
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}


export const assignChildrenToParentById = async (req, res, next_ => {
    try {
        
    } catch (err) {
        return res.status(500).json({
            error: err
        })        
    }
})
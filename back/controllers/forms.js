import prisma from '../db/prisma'
import config from '../config/index'


/* 
Create seperate funcs for each form type and run through making the form automatiically with the childrens model
*/
export const form  = async (req, res, next) => {
    try {
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// View all forms for given child id
export const getAllFormsForChild  = async (req, res, next) => {
    try {
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}


// idk what else to put here gonna pause for now
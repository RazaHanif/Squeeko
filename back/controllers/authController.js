import prisma from '../db/prisma'


// Create a Center -- takes in form from frontend
export const registerCenter = async (req, res, next) => {
    // TODO: Validate req.body (name, address, phone, email, supervisorName, regFee, latePickupFee)
    
    // Do some server side validation for info
    const data = req.body

    const name = data.name
    // Check if name already exists in db, name must be unique
    


    const address = data.address
    // Check if address is real?? -- IDK how to do that??
    // Just going to make sure it exists for now
    if (!address) {
        return res.status(400).json({
            error: 'Invalid Address'
        })
    }

    const phone = data.phone
    // regex check for valid number
    if (!validatePhone(phone)) {
        return res.status(400).json({
            error: 'Invalid Phone Number'
        })
    }

    const email = data.email
    // regex check for valid email
    if (!validateEmail(email)) {
        return res.status(400).json({
            error: 'Invalid Email Address'
        })
    }

    const supervisor = data.supervisor
    // Check if name exists in users and has supervisor role

    const registrationFee = data.registrationFee
    const lateFee = data.lateFee
    // Just check if the fees are valid prices

    const fees = data.fees
    // idk about this check, cuz like every center does it different
    // maybe just check it exists as a key:value -- package1:$400



}

export const registerUser = async (req, res, next) => {
    // TODO: Validate req.body (centerId, center, email, passwordHash, name, role)
    // Based on ROLE -> differnt sub route registerStaff or registerParent
}

const regiserParent = async (req, res, next) => {
    // TODO: Validate req.body(center, user, name, relation to child, address, phone, email, employer, workphone, child, policyagreements(retroactive), signedconsents, stripe_id)
    // Create Parent Profile
}

const registerStaff = async (req, res, next) => {
    // TODO: Validate req.body(center, user, name, email, phonenumber, cpr, ece, tb, vaccines, policerecord, offensedec, )
    // Create Staff Profile
}

export const loginUser = async (req, res, next) => {
    // TODO: Validate req.body (email, password)
    // Generate JWT for existing user
}

export const getProfile = async (req, res, next) => {
    // TODO: Validate req.body(user_id)
    // Return User
}


const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

const validatePhone = (phoneNumber) => {
    const re = /^(1[ -]?)?\d{3}[ -]?\d{3}[ -]?\d{4}$/
    return re.test(phoneNumber)
}


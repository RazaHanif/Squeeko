// Basic imports

// Create a Center -- takes in form from frontend
export const registerCenter = async (req, res, next) => {
    // TODO: Validate req.body (name, address, phone, email, supervisorName, regFee, latePickupFee)
    
    // Do some server side validation for info
    const data = req.body

    const name = data.name
    // Check if name already exists in db, name must be unique

    const address = data.address
    // Check if address is real? 
    // How to do that??

    const phone = data.phone
    // regex check for valid number

    const email = data.email
    // regex check for valid email

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
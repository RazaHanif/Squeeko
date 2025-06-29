// Basic imports

// Create a Center -- takes in form from frontend
export const registerCenter = async (req, res, next) => {
    // TODO: Validate req.body (name, address, phone, email, supervisorName, regFee, latePaymentFee)
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
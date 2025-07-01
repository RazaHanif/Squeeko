import prisma from '../db/prisma'


// Create a Center -- takes in form from frontend
export const registerCenter = async (req, res, next) => {
    try {
        // Server Side Validation before creating Center
        const data = req.body
    
        // No check needed - just check if it exists
        const name = data.name?.trim()
        if (!validateName(name)) {
            return res.status(400).json({
                error: 'Invalid Name'
            })
        }
    
        // Check if address is real?? -- IDK how to do that??
        // Just going to make sure it exists for now
        const address = data.address?.trim()
        if (!address) {
            return res.status(400).json({
                error: 'Invalid Address'
            })
        }
    
        // Check if its a valid Phone Number (logically not actually call testing)
        const phone = data.phone
        if (!validatePhone(phone)) {
            return res.status(400).json({
                error: 'Invalid Phone Number'
            })
        }
    
        // Check if its a valid Email (regex check not actually emailing rn)
        const email = data.email
        if (!validateEmail(email)) {
            return res.status(400).json({
                error: 'Invalid Email Address'
            })
        }
    
        // Make sure Center doesn't exist already
        const emailCheck = await prisma.center.findFirst({
            where: {
                email: email
            }
        })
    
        if (emailCheck) {
            return res.status(400).json({
                error: 'Center already exists'
            })
        } 
    
        // Check if name exists in users and has supervisor role
        const supervisorEmail = data.supervisorEmail
    
        const supervisor = await prisma.user.findFirst({
            where: {
                email: supervisorEmail
            }
        })
    
        if (!supervisor) {
            return res.status(400).json({
                error: 'Supervisor does not exist'
            })
        }
    
        if (supervisor.role !== 'CENTER_SUPERVISOR') {
            return res.status(400).json({
                error: `${supervisor.firstName} ${supervisor.lastName} does not have valid credentials`
            })
        }

        // Just check if the fees exist
        const registrationFee = parseFloat(data.registrationFee.trim())
        if (isNaN(registrationFee)) {
            return res.status(400).json({
                error: 'Invalid Registration Fee'
            })
        }
    
        const lateFee = parseFloat(data.lateFee.trim())
        if (isNaN(lateFee)) {
            return res.status(400).json({
                error: 'Invalid Late Fee'
            })
        }
    
        // idk about this check, cuz like every center does it different
        const fees = data.fees
        if (!fees) {
            return res.status(400).json({
                error: 'what da heck!'
            })
        }
    
        const newCenter = await prisma.center.create({
            data: {
                email: email,
                name: name,
                address: address,
                phone: phone,
                supervisor: {
                    connect: {
                        id: supervisor.id
                    }
                },
                registrationFee: registrationFee,
                latePickupFee: lateFee,
                studentFees: fees
            }
        })

        return res.status(201).json(newCenter)

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}` 
        })
    }
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

const validateName = (name) => {
    const re = /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]+$/
    return re.test(name)
}

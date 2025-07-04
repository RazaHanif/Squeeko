import jwt from 'jsonwebtoken'
import { JsonWebTokenError } from 'jsonwebtoken'
import prisma from '../db/prisma'
import bcrypt from 'bcrypt'

import config from '../config/index'

const JWT_SECRET = config.JWT_SECRET
const JWT_REFRESH_SECRET = config.JWT_REFRESH_SECRET


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
    try {
        const data = req.body

        // Validate Center Id
        const centerId = data.centerId
        // Check if thats a real center
        const center = await prisma.center.findFirst({
            where: {
                id: centerId
            }
        })

        if (!center) {
            return res.status(400).json({
                error: `Center with id ${centerId} does not exist`
            })
        }

        // Validate Email
        const email = data.email

        const checkEmail = validateEmail(email)

        if(!checkEmail) { 
            return res.status(400).json({
                error: 'Invalid Email'
            })
        }

        const phone = data.phone

        const checkPhone = validatePhone(phone)

        if (!checkPhone) {
            return res.status(400).json({
                error: 'Invalid Phone Number'
            })
        }

        // This feels wrong?
        // Should probably hash before storing even in a var
        const password = await bcrypt.hasth(data.password, 10)
        
        // Might be overkill for name assingment
        const firstName = data.firstName

        if (!validateName(firstName)) {
            return res.status(400).json({
                error: 'Invalid First Name'
            })
        }
        const lastName = data.lastName
        if (!validateName(lastName)) {
            return res.status(400).json({
                error: 'Invalid Last Name'
            })
        }

        // Validate Role Assignment
        const role = data.role
        if (!['CENTER_SUPERVISOR', 'STAFF', 'PARENT'].includes(role)) {
            return res.status(400).json({
                error: 'Invalid Role'
            })
        }

        const newUser = await prisma.user.create({
            data: {
                centerId: centerId,
                center: {
                    connect: {
                        id: centerId
                    }
                },
                email: email,
                passwordHash: passwordHashed,
                firstName: firstName,
                lastName: lastName,
                role: role
            }
        })

        if (role === 'PARENT') {
            return registerParent(data, newUser.id)
        } else if (role === 'STAFF') {
            return registerStaff(data, newUser.id)
        }

        return res.status(201).json(newUser)

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

const registerParent = async (data, userId) => {
    // TODO: Validate req.body(center, user, name, relation to child, address, phone, email, employer, workphone, child, policyagreements(retroactive), signedconsents, stripe_id)
    // Create Parent Profile

    try {        
        // At this point all info besides work number has been validated in prev func
        const workPhone = data.workNumber
    
        const checkWorkPhone = validatePhone(workPhone)
    
        if (!checkWorkPhone) {
            return res.status(400).json({
                error: 'Invalid Work Phone Number'
            })
        }
    
        if (!data.relationshipToChild) {
            return res.status(400).json({
                error: 'Invalid Relationship to child'
            })
        }
    
        const newParent = await prisma.parent.create({
            data: {
                centerId: data.centerId,
                center: {
                    connect: {
                        id: data.centerId
                    }
                },
                userId: userId,
                user: {
                    connect: {
                        id: userId
                    }
                },
                firstName: data.firstName,
                lastName: data.lastName,
                relationshipToChild: data.relationshipToChild,
                address: data.address,
                phoneNumber: data.phone,
                emailAddress: data.email,
                employer: data.employer,
                workNumber: data.workNumber,
            }
        })
    
        // Gotta figure out how to assign Children[] PolicyAgreements[] & SignedConsents[]
    
        return res.status(201).json(newParent)
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

const registerStaff = async (data, userId) => {
    // TODO: Validate req.body(center, user, name, email, phonenumber, cpr, ece, tb, vaccines, policerecord, offensedec, )
    // Create Staff Profile
    try {
        // Cant really check if the dates are true, can only check if its a valid date time
        if (!validateDateTime(data.cprRenewalDate)) {
            return res.status(400).json({
                error: 'Invalid CPR Renewal Date'
            })
        }

        if (!validateDateTime(data.eceLicenseExpiryDate)) {
            return res.status(400).json({
                error: 'Invalid ECE License Expiry Date'
            })
        }

        if (!validateDateTime(data.tbTestDate)) {
            return res.status(400).json({
                error: 'Invalid TB Test Date'
            })
        }
        if (!validateDateTime(data.policeRecordCheckDate)) {
            return res.status(400).json({
                error: 'Invalid Police Record Check Date'
            })
        }
        if (!validateDateTime(data.offenseDeclarationDate)) {
            return res.status(400).json({
                error: 'Invalid Offense Delaration Date'
            })
        }

        const newStaff = await prisma.staff.create({
            data: {
                centerId: data.centerId,
                center: {
                    connect: {
                        id: data.centerId
                    }
                },
                userId: userId,
                user: {
                    connect: {
                        id: userId
                    }
                },
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phoneNumber: data.phone,

                cprRenewalDate: data.cprRenewalDate,
                eceLicenseExpiryDate: data.eceLicenseExpiryDate,
                tbTestDate: data.tbTestDate,
                vaccinesList: data.vaccinesList,
                policeRecordCheckDate: data.policeRecordCheckDate,
                offenseDeclarationDate: data.offenseDeclarationDate
            }
        })

        return res.status(201).json(newStaff)
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }

}

export const loginUser = async (req, res, next) => {
    // TODO: Validate req.body (email, password)
    try {
        const data = req.body
        
        const email = data.email

        if (!validateEmail(email)) {
            return res.status(400).json({
                error: 'Invalid Email'
            })
        }

        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) {
            return res.status(400).json({
                error: 'Invalid Username or Password!'
            })
        }

        const accessToken = jwt.sign({ 
                id: user.id,
                email: user.email,
                role: user.role,
                center: user.centerId
            }, 
            JWT_SECRET, { expiresIn: '15m' }
        )
        
        const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: '7d' })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: config.NODE_ENV ==='production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            accessToken
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}


export const refreshAccessToken = async (req, res, next) => {
    try {
        
        const token = req.cookies.refreshToken

        if (!token) {
            return res.status(401).json({
                error: 'No Refresh Token Provided'
            })
        }

        const decoded = jwt.verify(token, JWT_REFRESH_SECRET)

        const user = await prisma.user.findFirst({
            where: {
                id: decoded.id
            }
        })

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            })
        }

        const accessToken = jwt.sign({ 
                id: user.id,
                email: user.email,
                role: user.role,
                center: user.centerId
            }, 
            JWT_SECRET, { expiresIn: '15m' }
        )

        return res.status(200).json({
            accessToken
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}


export const getProfile = async (req, res, next) => {
    // TODO: Validate req.body(user_id)
    // Protected route only used by me

    try {
        const userId = req.body.userId

        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })

        if (!user) {
            return res.status(400).json({
                error: `User with id ${userId} does not exist` 
            })
        }

        return res.status(200).json(user)

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

export const updateProfile = async (req, res, next) => {
    // Let the user update thier own profile
    // Can only change password?

    const currentUser = req.user.id
    const data = req.body
    const password = await bcrypt.hasth(data.password, 10)

    const updatedUser = prisma.user.update({
        where: {
            id: currentUser
        },
        data: {
            passwordHash: password
        }
    })

    if (!updatedUser) {
        return res.status(400).json({
            error: 'honestly, who knows...'
        })
    }

    return res.status(200).json(updatedUser)
}

export const logout = async (req, res, next) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: config.NODE_ENV === 'production',
        sameSite: 'Strict'
    })

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

const validateDateTime = (dateTime) => {
    const date = new Date(dateTime)
    return !isNaN(date.getTime())
}

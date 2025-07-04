import jwt from 'jsonwebtoken'
import config from '../config'
import prisma from '../db/prisma'

const protect = async (req, res, next) => {
    // Protect the route from dragons?
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                error: 'Invalid Authorization'
            })
        }

        const token = authHeader.split(' ')[1]

        const decoded = jwt.verify(token, config.JWT_SECRET)

        req.user = await prisma.user.findFirst({
            where: {
                id: decoded.id
            },
            select: {
                id: true,
                email: true,
                role: true,
                centerId: true
            }
        })

        if (!req.user) {
            return res.status(401).json({
                error: 'User not found!'
            })
        }

        next()
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}


export default protect
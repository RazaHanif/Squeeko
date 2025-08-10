import prisma from '../db/prisma'

export default messageSocketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`)
    })

    socket.on('send_message', async (data) => {
        
    })
}
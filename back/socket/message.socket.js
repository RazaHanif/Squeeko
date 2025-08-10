import prisma from '../db/prisma'

// Websocket for realtime messages
export const messageSocketHandler = (io) => {
    io.on('connection', (socket) => {
        socket.emit('connected', `User connected with id: ${socket.id}`)

        // Create room for user_id
        socket.on('join', (user_id) => {
            socket.join(user_id)
            socket.emit('joined', { message: 'User joined room' })
        })

        // Send/Receive message
        socket.on('send_message', async (data) => {
            try {
                const { sender_id, receiver_id, content, image_url } = data

                const message = await prisma.message.create({
                    data: {
                        sender_id,
                        receiver_id,
                        content: content || null,
                        image_url: image_url || null
                    }
                })

                // Send message to receiver
                io.to(receiver_id).emit('receive_message', message)
                socket.emit('sent_message', message)
            }
            catch (err) {
                socket.emit('error', { message: `Failed to send message: ${err}` })
            }
        })

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`)
        })
    })
}
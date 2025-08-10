import prisma from '../db/prisma'

// Websocket for realtime messages
export const messageSocketHandler = (io) => {
    io.on('connection', (socket) => {
        socket.emit('connected', `User connected with id: ${socket.id}`)

        // Make socket.id same as user_id to avoid conflicts
        socket.on('join', (user_id) => {
            socket.join(user_id)
            console.log(`User ${user_id} joined`)
        })

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
                io.to(receiver_id).emit('receive_message', message)
                socket.emit('message_sent', message)
            }
            catch (err) {
                console.log(err)
                socket.emit('error', 'Failed to send message')
            }
        })

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`)
        })
    })
}
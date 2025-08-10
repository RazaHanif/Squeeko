import prisma from '../db/prisma'

/* 
model Message {
  id          String   @id @default(cuid())
  sender      User     @relation("SentMessages", fields: [sender_id], references: [id])
  sender_id   String
  receiver    User     @relation("ReceivedMessages", fields: [receiver_id], references: [id])
  receiver_id String
  content     String?
  image_url   String?
  created_at  DateTime @default(now())
}
*/

export default messageSocketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`)

        // make socket_user_id same as user_id
        socket.on('join', (userId) => {
            socket.join(userId)
            console.log(`User ${userId} joined room`)
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
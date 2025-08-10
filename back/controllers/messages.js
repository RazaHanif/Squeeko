import prisma from '../db/prisma'
import config from '../config/index'


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

// Send a message
export const sendMessageOffline = async (req, res, next) => {
    try {
        const data = req.body

        // Feel like I should do some sort of server side validation here?

        const message = await prisma.message.create({
            data: {
                sender_id: data.sender_id,
                receiver_id: data.receiver_id,
                content: data.content,
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}

// Get message thread with another user
export const fetchHistory = async (req, res, next) => {
    try {
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}

// Attach media to a message
// Figure out how to upload to s3 with presigned url - or supabase idk yet
export const uploadImage = async (req, res, next) => {
    try {
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}
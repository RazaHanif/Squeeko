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
export const sendMessage = async (req, res, next) => {
    try {
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// Get message thread with another user
export const getMessageThread = async (req, res, next) => {
    try {
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// Get current users messages
export const getCurrentUserMessages = async (req, res, next) => {
    try {
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}

// Attach media to a message
// Figure out how to upload to s3 with presigned url - or supabase idk yet
export const uploadMediaToMessage = async (req, res, next) => {
    try {
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: `Error: ${err}`
        })
    }
}
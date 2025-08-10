import prisma from '../db/prisma'
import { supabase } from "@supabase/supabase-js"
import { v4 as uuidv4 } from 'uuid'
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
        const session = await auth.api.getSession({ req })
        if (!session) return res.status(401).json({
            error: 'Unauthorized'
        })
        const data = req.body

        // Feel like I should do some sort of server side validation here?

        const message = await prisma.message.create({
            data: {
                sender_id: data.sender_id,
                receiver_id: data.receiver_id,
                content: data.content || null,
                image_url: data.image_url || null
            }
        })

        // Should be good?
        res.status(200).json({
            message
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
        const session = await auth.api.getSession({ req })
        if (!session) return res.status(401).json({
            error: 'Unauthorized'
        })

        const currentUserId = session.user.id
        const { otherUserId } = req.body

        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { sender_id: currentUserId, receiver_id: otherUserId },
                    { sender_id: otherUserId, receiver_id: currentUserId }
                ]
            },
            orderBy: {
                created_at: 'asc'
            }
        })

        // Feel like there should be a check to see if it exists

        res.status(200).json({
            messages
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}

// Attach media to a message
// Should only work for images rn because of middleware check on routes
export const uploadMedia = async (req, res, next) => {
    try {
        const session = await auth.api.getSession({ req })
        if (!session) return res.status(401).json({
            error: 'Unauthorized'
        })

        const file = req.file

        if (!file) {
            return res.status(400).json({
                error: 'Invalid File'
            })
        }

        const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '');
        const filename = `${uuidv4()}-${safeName}`;

        const { data, error } = await supabase.storage.from('chat-images').upload(filename, file.buffer, {
            contentType: file.mimetype
        })

        if (error) {
            throw error
        }

        const { publicUrl } = supabase.storage.from('chat-images').getPublicUrl(filename).data
        
        return res.status(200).json({
            url: publicUrl
        })
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    }
}
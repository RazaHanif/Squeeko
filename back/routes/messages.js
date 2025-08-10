import { Router } from 'express';
import { fetchHistory, sendMessageOffline, uploadMedia } from '../controllers/messages';import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Invalid file type'), false)
        }
        cb(null, true)
    }
});


const router = Router();

router.post('/offline_messages', sendMessageOffline)
router.get('/history', fetchHistory)
router.post('/upload', upload.single('file'), uploadMedia)

export default router;
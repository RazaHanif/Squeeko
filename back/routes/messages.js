import { Router } from 'express';
import { fetchHistory, sendMessageOffline, uploadMedia } from '../controllers/messages';import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });


const router = Router();

router.post('/offline_messages', sendMessageOffline)
router.get('/history', fetchHistory)
router.post('/upload', upload.single('file'), uploadMedia)

export default router;
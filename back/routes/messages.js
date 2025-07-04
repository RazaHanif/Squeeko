import { Router } from 'express';
import { getCurrentUserMessages, getMessageThread, sendMessage, uploadMediaToMessage } from '../controllers/messages';

const router = Router();

router.post('/messages', sendMessage)
router.get('/messages/thread/:id', getMessageThread)
router.get('/messages/inbox/', getCurrentUserMessages)
router.post('/messages/upload', uploadMediaToMessage)

export default router;
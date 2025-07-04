import { Router } from 'express';
import { updateDailyLog, viewDailyLog, viewDailyLogHistory } from '../controllers/logs';

const router = Router();

router.post('/logs', updateDailyLog)
router.get('/logs', viewDailyLog)
router.get('/logs/history', viewDailyLogHistory)


export default router;
import { Router } from 'express';
import { getAllAttendance, getAttendanceForToday, updateAttendance, updateDailyLog, viewDailyLog, viewDailyLogHistory } from '../controllers/logs';

const router = Router();

router.post('/logs', updateDailyLog)
router.get('/logs', viewDailyLog)
router.get('/logs/history', viewDailyLogHistory)
router.get('/attendance', getAllAttendance)
router.post('/attendance', updateAttendance)
router.get('/attendance/today', getAttendanceForToday)

export default router;
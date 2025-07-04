import { Router } from 'express';
import { settings, stats } from '../controllers/admin';

const router = Router();

router.get('/admin/stats', stats)
router.put('/admin/settings', settings)

export default router;
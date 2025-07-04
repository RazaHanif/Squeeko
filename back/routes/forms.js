import { Router } from 'express';
import { getAllFormsForChild } from '../controllers/forms';

const router = Router();

router.get('/documents/:childId', getAllFormsForChild)

export default router;
import { Router } from 'express';

const router = Router();

router.get('/documents/:childId', getAllFormsForChild)

export default router;
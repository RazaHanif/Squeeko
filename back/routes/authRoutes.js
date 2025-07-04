import { Router } from 'express';

import { registerCenter, registerUser, loginUser, getProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register/center', registerCenter)
router.post('/register/user', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getProfile); // This route is protected

export default router;
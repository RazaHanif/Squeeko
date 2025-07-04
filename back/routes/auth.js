import { Router } from 'express';

import { registerCenter, registerUser, loginUser, getProfile, refreshAccessToken, logout, updateProfile } from '../controllers/auth.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register/center', registerCenter)
router.post('/register/user', registerUser)
router.post('/login', loginUser)
router.post('/logout', logout)
router.get('/me', protect, getProfile); // This route is protected
router.put('/me', protect, updateProfile)
router.post('/refresh', refreshAccessToken)


export default router;
// routes/authRoutes.js
import { Router } from 'express';
import { registerCenterAdmin, loginUser, getProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js'; // Will create this

const router = Router();

router.post('/register/center-admin', registerCenterAdmin);
router.post('/login', loginUser);
router.get('/me', protect, getProfile); // This route is protected

export default router;
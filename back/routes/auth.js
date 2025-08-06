import { Router } from 'express';
import { signUp, signIn, signOut, updateName, updatePassword, adminResetPassword, me } from '../controllers/auth.js';

const router = Router();

router.post('/sign_up', signUp)
router.post('/sign_in', signIn)
router.post('/sign_out', signOut)
router.put('/update_name', updateName)
router.put('/update_password', updatePassword)
// Secret Super User route rn - will be public later
router.post('/reset_password', adminResetPassword)
router.get('/me', me)


export default router;
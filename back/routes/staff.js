import { Router } from 'express';
import { getAllStaff, getStaffById, updateStaffById, deleteStaffById } from '../controllers/staff.js';


const router = Router();

router.get('/staff', getAllStaff)
router.get('/staff/:id', getStaffById)
router.put('/staff/:id', updateStaffById)
router.delete('/staff/:id', deleteStaffById)

export default router;
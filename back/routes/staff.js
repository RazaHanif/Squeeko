import { Router } from 'express';
import { getAllStaff, getStaffById, updateStaffPhoneNumberById, deleteStaffById, updateStaffById } from '../controllers/staff.js';


const router = Router();

router.get('/staff', getAllStaff)
router.get('/this_staff', getStaffById)
router.put('/this_staff', updateStaffPhoneNumberById)
router.delete('/this_staff', deleteStaffById)
router.put('/that_staff', updateStaffById)

export default router;
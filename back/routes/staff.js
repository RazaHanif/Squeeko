import { Router } from 'express';
import { getAllStaff, getStaffById, updateStaffPhoneNumberById, deleteStaffById } from '../controllers/staff.js';


const router = Router();

router.get('/staff', getAllStaff)
router.get('/this_staff', getStaffById)
router.put('/this_staff', updateStaffPhoneNumberById)
router.delete('/this_staff/', deleteStaffById)

export default router;
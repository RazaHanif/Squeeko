import { Router } from 'express';
import { deleteChildById, deleteParentById, getAllChildren, getAllParents, getChildById, getParentById, intake, updateChildById, updateParentById } from '../controllers/family';

const router = Router();

router.post('/intake', intake)
router.get('/parent', getAllParents)
router.get('/parent/:id', getParentById)
router.put('/parent/:id', updateParentById)
router.delete('/parent/:id', deleteParentById)
router.get('/children', getAllChildren)
router.get('/children/:id', getChildById)
router.put('/children/:id', updateChildById)
router.delete('/children/:id', deleteChildById)

export default router;
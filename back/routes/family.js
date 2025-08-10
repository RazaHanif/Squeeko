import { Router } from 'express';
import { assignChildrenToParentById, intake } from '../controllers/family';

const router = Router();

router.get('/intake', intake)
router.put('/assign_child', assignChildrenToParentById)

export default router;
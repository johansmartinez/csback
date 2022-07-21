import {Router} from 'express';
import {createRequirement} from '../controllers/requirementController';
import { isAdmin} from '../auth/auth';

const router= Router();

router.post('/', [isAdmin] ,createRequirement);

export default router;
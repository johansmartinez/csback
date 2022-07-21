import {Router} from 'express';
import {getComponents} from '../controllers/componentController';
import { isUser} from '../auth/auth';

const router= Router();

router.get('/', [isUser] ,getComponents);

export default router;
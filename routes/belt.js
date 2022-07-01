import {Router} from 'express';
import {getAllBelts} from '../controllers/beltController';
import {isUser} from '../auth/auth';

const router= Router();

router.get('/', [isUser] ,getAllBelts);

export default router;
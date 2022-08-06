import {Router} from 'express';
import {getAllBelts, getBelt} from '../controllers/beltController';
import {isUser} from '../auth/auth';

const router= Router();

router.get('/', [isUser] ,getAllBelts);
router.get('/belt/:id', [isUser] ,getBelt);

export default router;
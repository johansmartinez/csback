import {Router} from 'express';
import {getRankStudent,iniatilizeRank} from '../controllers/rankController';
import {isInstructor, isUser} from '../auth/auth';

const router= Router();

router.get('/:documento', [isUser] ,getRankStudent);

router.post('/initializate', [isInstructor],iniatilizeRank);

export default router;
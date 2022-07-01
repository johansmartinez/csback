import {Router} from 'express';
import {getReports, addReport, evaluate} from '../controllers/reportController ';
import {isInstructor, isUser} from '../auth/auth';

const router= Router();

router.get('/:documento', [isUser] ,getReports);

router.post('/add', [isInstructor],addReport);

router.post('/evaluate', [isInstructor],evaluate);

export default router;
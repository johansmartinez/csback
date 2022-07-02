import {Router} from 'express';
import {getReports, addReport, evaluate, performance} from '../controllers/reportController ';
import {isInstructor, isUser} from '../auth/auth';

const router= Router();

router.get('/:documento', [isUser] ,getReports);

router.post('/add', [isInstructor],addReport);

router.post('/evaluate', [isInstructor],evaluate);

router.get('/performance/:documento',[isUser], performance);

export default router;
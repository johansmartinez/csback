import {Router} from 'express';
import { getStudents, registerAttendance } from '../controllers/attendanceContoller';
import { isInstructor} from '../auth/auth';

const router= Router();

router.get('/' , getStudents);

router.post('/' ,[isInstructor], registerAttendance);

export default router;
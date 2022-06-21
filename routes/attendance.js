import {Router} from 'express';
import { getStudents, registerAttendance, getAttendance } from '../controllers/attendanceContoller';
import { isInstructor, isUser} from '../auth/auth';

const router= Router();

router.get('/' , getStudents);

router.get('/:alumno',[isUser], getAttendance);

router.post('/' ,[isInstructor], registerAttendance);

export default router;
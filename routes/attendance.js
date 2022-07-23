import {Router} from 'express';
import { getStudents, registerAttendance, getAttendance, getReport } from '../controllers/attendanceContoller';
import { isInstructor, isUser} from '../auth/auth';

const router= Router();

router.get('/' , getStudents);

router.get('/:alumno',[isUser], getAttendance);

router.get('/report/:menor/:mayor',[isInstructor], getReport);

router.post('/' ,[isInstructor], registerAttendance);

export default router;
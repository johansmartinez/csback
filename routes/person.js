import {Router} from 'express';
import {createStudent, createInstructor, createAdmin, getPerson, login, edit, getStudents, getInstructors} from '../controllers/personController';
import { isUser, isInstructor, isAdmin} from '../auth/auth';

const router= Router();

router.get('/:documento',[isUser], getPerson);

router.post('/student', createStudent);

router.post('/instructor',[isAdmin], createInstructor);

router.post('/admin',{isAdmin}, createAdmin);

router.post('/login', login);

router.put('/',[isUser],edit);

router.get('/instructor/all',[isAdmin], getInstructors);

router.get('/student/all',[isInstructor], getStudents);

export default router;
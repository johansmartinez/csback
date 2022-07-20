import {Router} from 'express';
import {createStudent, createInstructor, createAdmin, getPerson, login, edit} from '../controllers/personController';
import { isUser, isStudent, isAdmin} from '../auth/auth';

const router= Router();

router.get('/:documento',[isUser], getPerson);

router.post('/student',[isAdmin], createStudent);

router.post('/instructor',[isAdmin], createInstructor);

router.post('/admin', createAdmin);

router.post('/login', login);

router.put('/',[isUser],edit);


export default router;
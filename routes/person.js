import {Router} from 'express';
import {createStudent, createInstructor, getPerson, login, edit} from '../controllers/personController';
import { isUser, isStudent, isAdmin} from '../auth/auth';

const router= Router();

router.get('/:documento',[isUser], getPerson);

router.post('/student', createStudent);

router.post('/instructor',[isAdmin], createInstructor);

router.post('/login', login);

router.put('/',[isUser],edit);


export default router;
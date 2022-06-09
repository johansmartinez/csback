import {Router} from 'express';
import {createStudent, createInstructor, getPerson, login} from '../controllers/personController';
import { isUser, isStudent } from '../auth/auth';

const router= Router();

router.get('/:documento',[isUser], getPerson);

router.post('/student', createStudent);

router.post('/instructor', createInstructor);

router.post('/login', login);


export default router;
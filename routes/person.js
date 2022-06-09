import {Router} from 'express';
import {createStudent, createInstructor, getPerson, login} from '../controllers/personController';

const router= Router();

router.get('/:documento', getPerson);

router.post('/student', createStudent);

router.post('/instructor', createInstructor);

router.post('/login', login);


export default router;
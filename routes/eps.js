import {Router} from 'express';
import {getEPS, createEPS} from '../controllers/epsController';

const router= Router();

router.get('/', getEPS);

router.post('/', createEPS);


export default router;
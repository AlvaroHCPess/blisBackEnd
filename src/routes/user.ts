import { Router } from 'express';
import { createUser } from '../controllers/userController';
import { validateUser } from '../middleware/validationMiddleware';

const router = Router();

router.post('/users', validateUser, createUser);

export default router;

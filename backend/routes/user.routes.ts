import { Router } from 'express';
import userController from '../controller/user.controller';

const router: Router = Router();


router.post('/login', userController.logIn);
router.post('/signup', userController.signUp);
router.get('/:id', userController.getProfile);

export default router;

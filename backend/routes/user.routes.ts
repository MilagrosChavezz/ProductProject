import { Router } from 'express';
import userController from '../controller/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';


const router: Router = Router();


router.post('/login', userController.logIn);
router.post('/signup', userController.signUp);
router.get('/getProfile', authenticateToken, userController.getProfile);

export default router;

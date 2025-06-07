import { Router } from 'express';
import orderController from '../controllers/order.controller';

const router: Router = Router();

router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);
router.get('/user/:userId', orderController.getOrdersByUserId);
router.delete('/:id', orderController.deleteOrder);

export default router;

import { Router } from 'express';
import ProductController from '../controllers/product.controller';


const router = Router();

router.get('/', ProductController.listProducts);
router.post('/add', ProductController.addProduct);


export default router;
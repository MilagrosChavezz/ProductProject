// product.routes.ts
import { Router } from 'express';
import * as ProductController from '../controller/product.controller';
import { isAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', ProductController.listProducts);
router.post('/add', isAdmin, ProductController.addProduct);
router.post('/cart/:id', ProductController.addProductToCart);
router.get('/:id', ProductController.getProductDetails);

export default router;

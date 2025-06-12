// product.routes.ts
import { Router } from 'express';
import * as ProductController from '../controller/product.controller';

const router = Router();

router.get('/', ProductController.listProducts);
router.post('/add', ProductController.addProduct);
router.post('/cart/:id', ProductController.addProductToCart);
router.get('/:id', ProductController.getProductDetails);

export default router;

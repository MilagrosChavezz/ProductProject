
import { Router } from 'express';
import { authenticateToken, isAdmin } from '../middleware/auth.middleware';
import { uploadSingleImage } from '../middleware/uploadImage.middleware';

import * as ProductController from '../controller/product.controller';


const router = Router();
router.post('/test', (req, res) => {
  console.log('✅ LLEGÓ A /test');
  res.status(200).json({ message: 'Funciona correctamente' });
});

router.get('/search', ProductController.filterProducts);
router.get('/', ProductController.listProducts);
router.post('/new',authenticateToken,isAdmin,uploadSingleImage,ProductController.addNewProduct);
router.post('/cart/:id', ProductController.addProductToCart);
router.get('/:id', ProductController.getProductDetails);



export default router;

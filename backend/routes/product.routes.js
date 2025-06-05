const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.post('/add', productController.addProduct);
router.get('/', productController.listProducts);
router.get('/details/:id', productController.getProductDetails);

module.exports = router;
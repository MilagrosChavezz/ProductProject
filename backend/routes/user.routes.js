const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.post('/signup', productController.signUp);
router.get('/login', productController.logIn);
router.get('/profile', productController.getProfile);

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

// GET all orders
router.get('/', orderController.getAllOrders);

// POST create new order
router.post('/', orderController.createOrder);

// GET order by ID
router.get('/user/:userId', orderController.getOrdersByUserId);

// DELETE an order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;

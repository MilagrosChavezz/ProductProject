const db = require('../models');
const Order = db.orders;

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las órdenes', error });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { userId, totalPrice, productId } = req.body;
    const newOrder = await Order.create({ userId, totalPrice, productId });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la orden', error });
  }
};

exports.getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.findAll({ where: { userId } });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las órdenes del usuario', error });
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Order.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: 'Orden eliminada correctamente' });
    } else {
      res.status(404).json({ message: 'Orden no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la orden', error });
  }
};
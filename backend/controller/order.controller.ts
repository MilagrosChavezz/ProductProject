import { Request, Response } from 'express';
import db from '../models';

const Order = db.orders;

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las órdenes', error });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, totalPrice, productId } = req.body;
    const newOrder = await Order.create({ userId, totalPrice, productId });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la orden', error });
  }
};

const getOrdersByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const orders = await Order.findAll({ where: { userId } });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las órdenes del usuario', error });
  }
};

const deleteOrder = async (req: Request, res: Response) => {
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

export default { getAllOrders, createOrder, getOrdersByUserId, deleteOrder };

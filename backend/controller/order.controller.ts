import { Request, Response } from 'express';

import OrderService from '../service/order.service';



const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { productId } = req.body;
    const newOrder = await OrderService.addToCart( userId, productId );
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error details:', error);
    res.status(400).json({ message: 'Error to create the order', error });
  }
};

const getOrdersByUserId = async (req: Request, res: Response) => {
   const userId = req.user?.id;

  
  console.log('User ID from params:', userId);  

  try {
    const orders = await OrderService.getOrderByUserId(Number(userId));
    if (!orders) {
      return void res.status(404).json({ message: 'No orders found for this user' });
    }
    console.log('Orders fetched:', orders);
    res.status(200).json(orders);
  } catch (error) {
      console.error('Error details:', error);
    res.status(500).json({ message: 'Error to obtain user order', error });
  }
};





export default {  createOrder, getOrdersByUserId };

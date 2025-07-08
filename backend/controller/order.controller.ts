import { Request, Response } from "express";

import OrderService from "../service/order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { productId, quantity } = req.body;

    if (typeof productId !== "number" || typeof quantity !== "number") {
      return void res.status(400).json({ message: "Invalid productId or quantity" });
    }
    const newOrder = await OrderService.addToCart(userId, productId, quantity);
    res.status(201).json(newOrder);
  } catch (error) {
    
    res.status(400).json({ message: "Error to create the order", error });
  }
};

const getOrdersByUserId = async (req: Request, res: Response) => {
  const userId: number | undefined = req.user?.id;

  try {
    if (!userId) {
      return void res.status(400).json({ message: "User ID is required" });
    }
    const orders = await OrderService.getOrderByUserId(userId);

    if (!orders) {
      return void res
        .status(404)
        .json({ message: "No orders found for this user" });
    }

    res.status(200).json(orders);
  } catch (error) {
    
    res.status(500).json({ message: "Error to obtain user order", error });
  }
};

export default { createOrder, getOrdersByUserId };

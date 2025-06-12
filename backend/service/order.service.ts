import db from "../models";
import { OrderData } from "../Request/OrderData";
import ProductService from "./product.service";
import productOrderService from "./productOrder.service";

const Order = db.Order;


class OrderService {

  async getAllOrders() {
    return await Order.findAll();
  }

  async addToCart(userId: number, productId: number) {
    let order = await this.getOrder(userId);

    if (!order) {
      order = await this.createOrder(userId);
    }

    const product = await ProductService.getProductDetails(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    const productOrder = await productOrderService.findProductOrder(
      order!.id,
      productId
    );

    productOrderService.addQuantity(order!.id, productId);
   
    if (order) {
      order.totalPrice = (order.totalPrice || 0) + product.price;
      await order.save();
      return order;
    } else {
      throw new Error("Order could not be created or found");
    }
  }

  async getOrder(userId: number) {
      
    let order = await Order.findOne({
      
      where: { userId, status: "open" },
       include: [
      {
        model: db.Product,
        as: 'products',
        through: { attributes: ['quantity'] }, 
      }
    ]
    });
    console.log('Order fetched:', order)
    return order;
  }

  async createOrder(userId: number) {
    let order: OrderData | null = await Order.create({
      userId,
      totalPrice: 0,
      status: "open",
    });
    return order;
  }

  async getOrdersByUserId(userId: number) {
    return await Order.findAll({ where: { userId } });
  }

  async deleteOrder(id: number) {
    return await Order.destroy({ where: { id } });
  }
}

export default new OrderService();

import { Product } from "../models/products";
import { Order } from "../models/orders";
import ProductService from "./product.service";
import productOrderService from "./productOrder.service";

class OrderService {
  
  async getAllOrders(): Promise<Order[]> {
    return Order.findAll();
  }

  async addToCart(userId: number, productId: number): Promise<Order> {
    let order = await this.getOrderByUserId(userId);

    if (!order) {
      order = await this.createOrder(userId);
    }

    const product = await ProductService.getProductDetails(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    await productOrderService.addQuantity(order.id, productId);
    await this.calculateTotalPrice(order.id);

    await order.reload();
    return order;
  }

  async calculateTotalPrice(orderId: number): Promise<number> {
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: Product,
          as: "products",
          through: { attributes: ["quantity"] },
        },
      ],
    });

    if (!order) {
      throw new Error("Order not found");
    }

    const products = (order as any).products || [];

    const totalPrice = products.reduce((total: number, product: any) => {
      const quantity = product.ProductOrder?.quantity || 0;
      const price = product.price;
      return total + quantity * price;
    }, 0);

    await order.update({ totalPrice });

    return totalPrice;
  }

  async createOrder(userId: number): Promise<Order> {
    return Order.create({
      userId,
      totalPrice: 0,
      status: "open",
    });
  }

  async getOrderByUserId(userId: number): Promise<Order | null> {
    return Order.findOne({
      where: { userId, status: "open" },
      include: [
        {
          model: Product,
          as: "products",
          through: { attributes: ["quantity"] },
        },
      ],
    });
  }

  async deleteOrder(id: number): Promise<number> {
    return Order.destroy({ where: { id } });
  }
}

export default new OrderService();

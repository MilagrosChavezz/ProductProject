import db from '../models';
import { OrderCreationAttributes } from '../models/orders'; // Asegúrate de exportar esto si es necesario

const Order = db.orders;

class OrderService {
  async getAllOrders() {
    return await Order.findAll();
  }

  async createOrder(data: OrderCreationAttributes) {
    return await Order.create(data);
  }

  async getOrdersByUserId(userId: number) {
    return await Order.findAll({ where: { userId } });
  }

  async deleteOrder(id: number) {
    return await Order.destroy({ where: { id } });
  }
}

export default new OrderService();
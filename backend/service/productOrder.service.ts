import { ProductOrder } from "../models/product_order";

class ProductOrderService {
  
  async findProductOrder(orderId: number, productId: number) {
    return await ProductOrder.findOne({
      where: {
        orderId,
        productId,
      },
    });
  }

  async addQuantity(orderId: number, productId: number, quantityToAdd: number = 1) {
     console.log(`🧮 addQuantity: orderId=${orderId}, productId=${productId}, quantityToAdd=${quantityToAdd}`);
    let productOrder = await this.findProductOrder(orderId, productId);

    if (productOrder) {
      productOrder.quantity += quantityToAdd;
      await productOrder.save();
    } else {
      productOrder = await ProductOrder.create({
        orderId,
        productId,
        quantity: quantityToAdd,
      });
    }
    return productOrder;
  }
}

export default new ProductOrderService();

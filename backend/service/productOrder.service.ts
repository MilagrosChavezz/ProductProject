import db from '../models';





const ProductOrder = db.ProductOrder;

class ProductOrderService {

async findProductOrder(orderId: number, productId: number) {
  return await ProductOrder.findOne({
    where: {
      orderId,
      productId,
    },
  });
}



async addQuantity(orderId: number, productId: number) {
   let productOrder = await this.findProductOrder(orderId, productId);


  if (productOrder) {
    productOrder.quantity += 1;
    await productOrder.save(); 
  } else {
    productOrder = await ProductOrder.create({
      orderId,
      productId,
      quantity: 1,
    });
  }

  return productOrder;
  }
}

export default new ProductOrderService();
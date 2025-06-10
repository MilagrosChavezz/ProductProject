
import db from '../models'; 
import { ProductInput } from '../Request/productInput'; 

export class ProductService {
  private model = db.Product;

  async getAllProducts() {
    try {
      return await this.model.findAll();
    } catch (error) {
       console.error('❌ Sequelize error:', error);
    throw error;
    }
  }

  async createProduct(data: ProductInput) {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw new Error('Error al crear el producto');
    }
  }

  async getProductDetails(id: string | number) {
    try {
      return await this.model.findByPk(id);
    } catch (error) {
      throw new Error('Error al buscar el producto');
    }
  }
}
export default new ProductService();
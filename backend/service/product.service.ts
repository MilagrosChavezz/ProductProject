
import Product from '../models'; // Asegúrate que tu modelo esté exportado individualmente
import { ProductInput } from '../types/productInput'; // Tipos separados para mantener orden

export class ProductService {
  private model = Product;

  async getAllProducts() {
    try {
      return await this.model.findAll();
    } catch (error) {
      throw new Error('Error al obtener los productos');
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

import { ProductData } from "../Request/productData";
import { Product } from "../models/products";

export class ProductService {
  async getAllProducts(): Promise<Product[]> {
    try {
      return await Product.findAll();
    } catch (error) {
      console.error("❌ Sequelize error in getAllProducts:", error);
      throw error;
    }
  }

  async createProduct(data: ProductData): Promise<Product> {
    try {
      return await Product.create(data);
    } catch (error) {
      console.error("❌ Error creating product:", error);
      throw new Error("Error al crear el producto");
    }
  }

  async getProductDetails(id: string | number): Promise<Product | null> {
    try {
      return await Product.findByPk(id);
    } catch (error) {
      console.error("❌ Error fetching product details:", error);
      throw new Error("Error al buscar el producto");
    }
  }
}

export default new ProductService();

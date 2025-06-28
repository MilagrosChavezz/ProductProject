import { ProductData } from "../Request/productData";
import { Op } from 'sequelize';
import { Product } from "../models/products";
import { ProductFilters } from "../Request/productFilters";
import { WhereOptions } from "sequelize";

export class ProductService {

  async filterProducts(filters: ProductFilters): Promise<Product[]> {
    const { search , order } = filters;
    
    const whereClause: WhereOptions = {};

    
    if (search) {
      (whereClause as any)[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { category: { [Op.like]: `%${search}%` } },
      ];
    }

   

  const orderClause: [string, 'ASC' | 'DESC'][] = [];

  if (order === 'asc' || order === 'desc') {
    orderClause.push(['price', order.toUpperCase() as 'ASC' | 'DESC']);
  }

  return Product.findAll({
    where: whereClause,
    order: orderClause,
  });
  }


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

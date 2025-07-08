import { ProductData } from "../Request/productData";
import { Op, WhereOptions } from 'sequelize';
import { Product } from "../models/products";
import { ProductFilters } from "../Request/productFilters";

export class ProductService {


  async filterProducts(filters: ProductFilters): Promise<Product[]> {
    const { search, order,category } = filters;
    const whereClause: WhereOptions = {};

    if (search) {
      (whereClause as any)[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    if (category) {
      (whereClause as any).category = category;
    }

    const orderClause: [string, 'ASC' | 'DESC'][] = [];

    if (order === 'asc' || order === 'desc') {
      orderClause.push(['price', order.toUpperCase() as 'ASC' | 'DESC']);
    }

    return await Product.findAll({
      where: whereClause,
      order: orderClause
    });
  }

 async getAllCategories(): Promise<string[]> {
  try {
    const products = await Product.findAll({
      attributes: ['category'],
      group: 'category',
    });
    return products
      .map(product => product.category)
      .filter((category): category is string => typeof category === 'string');
  } catch (error) {
    console.error("❌ Sequelize error in getAllCategories:", error);
    throw error;
  }
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
      throw new Error("Error creating product");
    }
  }

  async getProductDetails(id: string | number): Promise<Product | null> {
    try {
      return await Product.findByPk(id);
    } catch (error) {
      console.error("❌ Error fetching product details:", error);
      throw new Error("Error fetching product details");
    }
  }
}

export default new ProductService();

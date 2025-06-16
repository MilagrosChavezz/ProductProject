import { Request, Response } from 'express';
import { ProductService } from '../service/product.service';

const productService = new ProductService();

export const addProduct = async (req: Request, res: Response): Promise<void> => {

   if (!req.user || req.user.role !== 'admin') {
     res.status(403).json({ message: 'Denied access. Admins only.' });
     return;
   }
   
  try {

    const { name, description, price, imageUrl, category } = req.body;

    if (!name || !price) {
      res.status(400).json({ message: 'Name and price are required.' });
      return;
    }

    const newProduct = await productService.createProduct({
      name,
      description,
      price,
      imageUrl,
      category,
    });

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

export const listProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
     console.error('Controller error in listProducts:', error);
    res.status(500).json({ message: 'Error getting all products', error });
  }
};

export const addProductToCart = async(req: Request, res: Response) => {
    throw new Error('Function not implemented.');
}

export const getProductDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await productService.getProductDetails(id);
    if (!product) {
      return void res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener detalles del producto', error });
  }
};

export default { addProduct, listProducts, getProductDetails,addProductToCart };



import { Request, Response } from 'express';
import { ProductService } from '../service/product.service';
import { ProductFilters } from '../Request/productFilters';


const productService = new ProductService();

function getStringParam(param: any): string | undefined {
  if (typeof param === "string") return param;
  return undefined;
}
function getOrderParam (param: unknown): 'asc' | 'desc' | undefined  {
  if (typeof param === 'string' && (param === 'asc' || param === 'desc')) {
    return param;
  }
  return undefined;
};

export const filterProducts = async (req: Request, res: Response) => {
  try {
    const filters: ProductFilters = {
      search: getStringParam(req.query.search),
      order: getOrderParam(req.query.order),
    };


    const products = await productService.filterProducts(filters);
    res.json(products);
  } catch (error) {
    console.error("Error to filter products:", error);
    res.status(500).json({ message: "Internal error" });
  }
}

export const addNewProduct = async (req: Request, res: Response) => {

  console.log('Request body:', req.body);
  try {

    const { name, description, price, category } = req.body;
    const imageFile = (req as any).file;
    const imageUrl = imageFile ? `/uploads/${imageFile.filename}` : null;

    if (!name || !price) {
      res.status(400).json({ message: 'Name and price are required.' });
      return;
    }

    const newProduct = await productService.createProduct({
      name,
      description,
      price,
      imageUrl: imageUrl || undefined,
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

export const addProductToCart = async (req: Request, res: Response) => {
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

export default { addNewProduct, listProducts, getProductDetails, addProductToCart };



import { Request, Response } from "express";
import { ProductService } from "../service/product.service";
import { ProductFilters } from "../Request/productFilters";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const productService = new ProductService();

function getStringParam(param: any): string | undefined {
  if (typeof param === "string") return param;
  return undefined;
}

function getOrderParam(param: unknown): "asc" | "desc" | undefined {
  if (typeof param === "string" && (param === "asc" || param === "desc")) {
    return param;
  }
  return undefined;
}

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
};

export const addNewProduct = async (req: MulterRequest, res: Response) => {
  try {
    const { name, description, price, category } = req.body;
    const priceNumber = Number(price);
    const imageFile = req.file;
    const imageUrl = imageFile ? `/uploads/${imageFile.filename}` : undefined;

    if (
      !name ||
      !description ||
      !category ||
      isNaN(priceNumber) ||
      priceNumber <= 0
    ) {
      return void res.status(400).json({ message: "All inputs must be completed and valid." });
    }

    const newProduct = await productService.createProduct({
      name,
      description,
      price: priceNumber,
      imageUrl,
      category,
    });

    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product", error });
  }
};

export const listProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting all products:", error);
    res.status(500).json({ message: "Error getting all products", error });
  }
};

export const getProductDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber = Number(id);

  if (isNaN(idNumber)) {
    return void res.status(400).json({ message: "Invalid product id" });
  }

  try {
    const product = await productService.getProductDetails(idNumber);
    if (!product) {
      return void res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error obtaining product details:", error);
    res.status(500).json({ message: "Error obtaining product details", error });
  }
};

export default { addNewProduct, listProducts, getProductDetails };

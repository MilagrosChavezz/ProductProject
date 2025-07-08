import { Router } from "express";
import { authenticateToken, isAdmin } from "../middleware/auth.middleware";
import { uploadSingleImage } from "../middleware/uploadImage.middleware";

import ProductController from "../controller/product.controller";

const router = Router();

router.get("/search", ProductController.filterProducts);
router.get("/", ProductController.listProducts);
router.post(
  "/new",
  authenticateToken,
  isAdmin,
  uploadSingleImage,
  ProductController.addNewProduct
);
router.get("/categories", ProductController.getCategories);
router.get("/:id", ProductController.getProductDetails);


export default router;

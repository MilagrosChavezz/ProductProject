import { Router } from "express";
import orderController from "../controller/order.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.get("/cart", authenticateToken, orderController.getOrdersByUserId);
router.post("/add", authenticateToken, orderController.createOrder);

export default router;

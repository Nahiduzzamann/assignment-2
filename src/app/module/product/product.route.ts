import express from "express";
import { ProductControllers } from "./product.controler";

const router = express.Router();
//product routes
router.post("", ProductControllers.createProduct);
router.get("", ProductControllers.getAllProducts);
router.get("/:productId", ProductControllers.getSingleProduct);
router.put("/:productId", ProductControllers.updateProduct);
router.delete("/:productId", ProductControllers.deletProduct);
export const ProductRoutes = router;

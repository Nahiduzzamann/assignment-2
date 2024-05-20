import express from "express";
import { ProductControllers } from "./product.controler";

const router = express.Router();
router.post("/products", ProductControllers.createProduct);
router.get("/products", ProductControllers.getAllProducts);

export const ProductRoutes = router;

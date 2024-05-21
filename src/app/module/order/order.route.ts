import express from "express";
import { OrderControllers } from "./order.controler";

const router = express.Router();
//product routes
router.post("", OrderControllers.createOrder);
router.get("", OrderControllers.getAllOrders);
export const OrderRoutes = router;

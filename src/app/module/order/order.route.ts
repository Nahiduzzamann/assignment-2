import express from "express";
import { OrderControllers } from "./order.controler";

const router = express.Router();
//order routes
router.post("", OrderControllers.createOrder);
router.get("", OrderControllers.getAllOrders);
export const OrderRoutes = router;

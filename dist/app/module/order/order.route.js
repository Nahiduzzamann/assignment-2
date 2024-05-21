"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controler_1 = require("./order.controler");
const router = express_1.default.Router();
//order routes
router.post("", order_controler_1.OrderControllers.createOrder);
router.get("", order_controler_1.OrderControllers.getAllOrders);
exports.OrderRoutes = router;

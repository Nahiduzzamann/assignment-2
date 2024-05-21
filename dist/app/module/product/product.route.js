"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controler_1 = require("./product.controler");
const router = express_1.default.Router();
//product routes
router.post("", product_controler_1.ProductControllers.createProduct);
router.get("", product_controler_1.ProductControllers.getAllProducts);
router.get("/:productId", product_controler_1.ProductControllers.getSingleProduct);
router.put("/:productId", product_controler_1.ProductControllers.updateProduct);
router.delete("/:productId", product_controler_1.ProductControllers.deletProduct);
exports.ProductRoutes = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/module/product/product.route");
const order_route_1 = require("./app/module/order/order.route");
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes
app.use("/api/products", product_route_1.ProductRoutes);
app.use("/api/orders", order_route_1.OrderRoutes);
//home route to check connectivity
app.get("/", (req, res) => {
    res.send("Hello World!");
});
//if route not match then sent message
app.all("*", (req, res) => {
    res.status(400).json({
        success: false,
        message: "Route not found",
    });
});
exports.default = app;

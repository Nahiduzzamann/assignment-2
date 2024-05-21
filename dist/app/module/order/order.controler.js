"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
const product_model_1 = require("../product/product.model");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        // Retrieve the product from the database based on productId
        const product = yield product_model_1.ProductModel.findById(orderData.productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        // Check if the ordered quantity exceeds the available quantity in inventory
        if (orderData.quantity > product.inventory.quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient quantity available in inventory",
            });
        }
        // Update inventory quantity and inStock status based on ordered quantity
        product.inventory.quantity -= orderData.quantity;
        product.inventory.inStock = product.inventory.quantity > 0;
        // Save the changes to the product model
        yield product.save();
        const result = yield order_service_1.OrderServices.createOrderIntoDB(orderData);
        // Send response
        res.status(201).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        //if search term exist then exucute search otherwise get all orders
        if (email) {
            const results = yield order_service_1.OrderServices.searchOrdersFromDB(email);
            res.status(200).json({
                success: true,
                message: `Orders fetched successfully for user email!`,
                data: results,
            });
        }
        else {
            const result = yield order_service_1.OrderServices.getAllOrdersIntoDB();
            // Send response
            res.status(201).json({
                success: true,
                message: "Orders fetched successfully!",
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
        });
    }
});
exports.OrderControllers = {
    createOrder,
    getAllOrders,
};

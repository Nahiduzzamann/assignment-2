"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderZodSchema = void 0;
const zod_1 = require("zod");
const orderSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email({ message: "Invalid email address" })
        .nonempty({ message: "Email is required" }),
    productId: zod_1.z.string().nonempty({ message: "Product ID is required" }),
    price: zod_1.z.number().positive({ message: "Price must be a positive number" }),
    quantity: zod_1.z
        .number()
        .int()
        .positive({ message: "Quantity must be a positive integer" }),
});
exports.OrderZodSchema = orderSchema;

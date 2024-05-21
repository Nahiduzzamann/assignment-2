"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductZodSchema = void 0;
const zod_1 = require("zod");
// Define Zod schema for variant
const variantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().nonempty(),
    value: zod_1.z.string().nonempty(),
});
// Define Zod schema for inventory
const inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().int().positive(),
    inStock: zod_1.z.boolean(),
});
// Define Zod schema for product
const productValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .nonempty()
        .min(2, { message: "Name must be at least 2 characters long" }).max(100, { message: "Name must be contain with in 100 characters" }),
    description: zod_1.z
        .string()
        .nonempty()
        .min(10, { message: "Description must be at least 10 characters long" }).max(2000, { message: "Description must be contain with in 2000 characters" }),
    price: zod_1.z.number().positive({ message: "Price must be a positive number" }),
    category: zod_1.z.string().nonempty(),
    tags: zod_1.z.array(zod_1.z.string()),
    variants: zod_1.z.array(variantValidationSchema),
    inventory: inventoryValidationSchema,
});
exports.ProductZodSchema = productValidationSchema;

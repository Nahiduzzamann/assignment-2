import { z } from "zod";

// Define Zod schema for variant
const variantValidationSchema = z.object({
  type: z.string().nonempty(),
  value: z.string().nonempty(),
});

// Define Zod schema for inventory
const inventoryValidationSchema = z.object({
  quantity: z.number().int().positive(),
  inStock: z.boolean(),
});

// Define Zod schema for product
const productValidationSchema = z.object({
  name: z
    .string()
    .nonempty()
    .min(2, { message: "Name must be at least 2 characters long" }).max(100,{ message: "Name must be contain with in 100 characters" }),
  description: z
    .string()
    .nonempty()
    .min(10, { message: "Description must be at least 10 characters long" }).max(2000,{ message: "Description must be contain with in 2000 characters" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  category: z.string().nonempty(),
  tags: z.array(z.string()),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema,
});
export const ProductZodSchema = productValidationSchema;

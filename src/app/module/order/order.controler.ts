import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import { ProductModel } from "../product/product.model";
import { TOrder } from "./order.interface";
import { OrderZodSchema } from "./order.zod.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData: TOrder = req.body;
    const zodValidatedData = OrderZodSchema.parse(orderData);

    // Retrieve the product from the database based on productId
    const product = await ProductModel.findById(zodValidatedData.productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    // Check if the ordered quantity exceeds the available quantity in inventory
    if (zodValidatedData.quantity > product.inventory.quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    }
    // Update inventory quantity and inStock status based on ordered quantity
    product.inventory.quantity -= zodValidatedData.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;

    // Save the changes to the product model
    await product.save();

    const result = await OrderServices.createOrderIntoDB(zodValidatedData);

    // Send response
    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    //if search term exist then exucute search otherwise get all orders
    if (email) {
      const results = await OrderServices.searchOrdersFromDB(email as string);

      res.status(200).json({
        success: true,
        message: `Orders fetched successfully for user email!`,
        data: results,
      });
    } else {
      const result = await OrderServices.getAllOrdersIntoDB();
      // Send response
      res.status(201).json({
        success: true,
        message: "Orders fetched successfully!",
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};
export const OrderControllers = {
  createOrder,
  getAllOrders,
};

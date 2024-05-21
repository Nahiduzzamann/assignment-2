import { Request, Response } from "express";
import { OrderServices } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const OrderData = req.body;
    // console.log(OrderData);
    const result = await OrderServices.createOrderIntoDB(OrderData);
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

import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { ProductZodSchema } from "./product.zod.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const zodValidatedData = ProductZodSchema.parse(productData);
    const result = await ProductServices.createProductIntoDB(zodValidatedData);
    // Send response
    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    //if search term exist then exucute search otherwise get all products
    if (searchTerm) {
      const results = await ProductServices.searchProductsFromDB(
        searchTerm as string
      );

      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: results,
      });
    } else {
      const result = await ProductServices.getAllProductsIntoDB();
      // Send response
      res.status(201).json({
        success: true,
        message: "Products fetched successfully!",
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
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.getSingleProductIntoDB(productId);
    // Send response
    res.status(201).json({
      success: true,
      message: "Product fetched successfully!",
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
const updateProduct = async (req: Request, res: Response) => {
  try {
    const updateData = req.body;
    const productId = req.params.productId;
    const result = await ProductServices.updateProductIntoDB(
      productId,
      updateData
    );
    // Send response
    res.status(201).json({
      success: true,
      message: "Product updated successfully!",
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
const deletProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.deleteProductFromDB(productId);
    // Send response
    res.status(201).json({
      success: true,
      message: "Product deleted successfully!",
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

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deletProduct,
};

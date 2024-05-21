import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (productData: TProduct) => {
  const res = await ProductModel.create(productData);
  return res;
};
const getAllProductsIntoDB = async () => {
  const res = await ProductModel.find();
  return res;
};
const getSingleProductIntoDB = async (_id: string) => {
  const res = await ProductModel.find({ _id });
  return res;
};
const updateProductIntoDB = async (_id: string, updateData: any) => {
  // Find the product
  const product = await ProductModel.findById(_id);

  if (!product) {
    throw new Error("Product not found");
  }

  // Update product fields with new data
  Object.assign(product, updateData);

  // Save the updated product
  await product.save();

  return product;
};
const deleteProductFromDB = async (_id: string) => {
  const result = await ProductModel.findByIdAndDelete(_id);

  if (!result) {
    throw new Error("Product not found");
  }

  return null;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsIntoDB,
  getSingleProductIntoDB,
  updateProductIntoDB,
  deleteProductFromDB
};

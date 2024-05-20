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
const getSingleProductIntoDB = async (_id:string) => {
  const res = await ProductModel.find({_id});
  return res;
};

export const ProductServices = {
    createProductIntoDB,
    getAllProductsIntoDB,
    getSingleProductIntoDB
};
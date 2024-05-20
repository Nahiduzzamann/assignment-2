import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (productData: TProduct) => {
  const res = await ProductModel.create(productData);
  return res;
};

export const ProductServices = {
    createProductIntoDB,
};
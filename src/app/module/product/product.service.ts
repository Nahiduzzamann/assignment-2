import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (productData: TProduct) => {
  try {
    // try to create a new product
    const newProduct = await ProductModel.create(productData);
    return newProduct;
  } catch (error: any) {
    // Check if the error is a MongoDB duplicate key error
    if (error.code === 11000) {
      throw new Error("Product with this ID already exists");
    }
    // Throw any other errors
    throw new Error(`Failed to create product: ${error.message}`);
  }
};
const getAllProductsIntoDB = async () => {
  const res = await ProductModel.find();
  return res;
};
const getSingleProductIntoDB = async (id: string) => {
  const res = await ProductModel.findOne({ id });
  return res;
};
const updateProductIntoDB = async (id: string, updateData: any) => {
  // Find the product
  const product = await ProductModel.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  // Update product fields with new data
  Object.assign(product, updateData);

  // Save the updated product
  await product.save();

  return product;
};
const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.findOneAndDelete({ id: id });

  if (!result) {
    throw new Error("Product not found");
  }

  return null;
};
const searchProductsFromDB = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, "i");
  const results = await ProductModel.find({
    $or: [
      { name: regex },
      { description: regex },
      { category: regex },
      { tags: regex }
    ]
  });
  return results;
};
export const ProductServices = {
  createProductIntoDB,
  getAllProductsIntoDB,
  getSingleProductIntoDB,
  updateProductIntoDB,
  deleteProductFromDB,
  searchProductsFromDB
};

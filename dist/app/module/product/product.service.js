"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield product_model_1.ProductModel.create(productData);
    return res;
});
const getAllProductsIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield product_model_1.ProductModel.find();
    return res;
});
const getSingleProductIntoDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield product_model_1.ProductModel.findOne({ _id });
    return res;
});
const updateProductIntoDB = (_id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the product
    const product = yield product_model_1.ProductModel.findById(_id);
    if (!product) {
        throw new Error("Product not found");
    }
    // Update product fields with new data
    Object.assign(product, updateData);
    // Save the updated product
    yield product.save();
    return product;
});
const deleteProductFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findByIdAndDelete(_id);
    if (!result) {
        throw new Error("Product not found");
    }
    return null;
});
const searchProductsFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(searchTerm, "i");
    const results = yield product_model_1.ProductModel.find({
        $or: [
            { name: regex },
            { description: regex },
            { category: regex },
            { tags: regex }
        ]
    });
    return results;
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProductsIntoDB,
    getSingleProductIntoDB,
    updateProductIntoDB,
    deleteProductFromDB,
    searchProductsFromDB
};

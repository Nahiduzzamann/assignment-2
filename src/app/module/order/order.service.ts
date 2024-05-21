import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDB = async (OrderData: TOrder) => {
  const res = await OrderModel.create(OrderData);
  return res;
};
const getAllOrdersIntoDB = async () => {
  const res = await OrderModel.find();
  return res;
};
const searchOrdersFromDB = async (email: string) => {
  const results = await OrderModel.findOne({ email: email });
  return results;
};
export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersIntoDB,
  searchOrdersFromDB
};

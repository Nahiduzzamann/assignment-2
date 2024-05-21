import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";

const OrderSchema: Schema = new Schema<TOrder>({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

// Create the Order model
export const OrderModel = model<TOrder>("Order", OrderSchema);

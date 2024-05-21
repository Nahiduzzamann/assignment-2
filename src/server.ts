import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";
import { ProductModel } from "./app/module/product/product.model";

async function main() {
  // console.log(config.database_url);
  //connect database by using mongoose
  try {
    await mongoose.connect(config.database_url as string);
    await ProductModel.syncIndexes(); //for make id field unique
    app.listen(config.port, () => {
      console.log(`Shop app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

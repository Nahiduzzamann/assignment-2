import express, { Application, Request, Response } from "express";
import cors from 'cors'
import { ProductRoutes } from "./app/module/product/product.route";
import { OrderRoutes } from "./app/module/order/order.route";

const app: Application = express();

// parser 
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/products',ProductRoutes)
app.use('/api/orders',OrderRoutes)

//home route to check connectivity
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app
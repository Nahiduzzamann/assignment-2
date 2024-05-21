import express, { Application, Request, Response } from "express";
import cors from 'cors'
import { ProductRoutes } from "./app/module/product/product.route";

const app: Application = express();

// parser 
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/products',ProductRoutes)

//home route to check connectivity
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app
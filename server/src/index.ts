import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import productRoutes from "./routes/product.routes.js";


const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/products", async(req, res) => {
  const products = await prisma.product.findMany({
    include: { 
      category: true 
    } 
  });
  res.json(products);
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});


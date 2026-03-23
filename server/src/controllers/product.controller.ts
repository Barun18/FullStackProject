import { prisma } from "../lib/prisma.js";
import { Request, Response } from "express";

export const getProducts =  async (req:Request, res:Response) =>{
    const products = await prisma.product.findMany();
    res.json(products);
}
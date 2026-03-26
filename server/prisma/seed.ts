
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { products, categories } from "./productData.js"
import { PrismaClient } from "@prisma/client"


if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing")
}
const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
});

async function main() {

    for (let category of categories) {
        await prisma.category.create({
            data: category,
            // skipDuplicates: true,
        });
    }
    for (let product of products) {
        const createdProduct = await prisma.product.create({
            data: {
                title: product.title,
                price: product.price,
                details: product.details,
                img: product.img,
                type: product.type,

                rating: product.rating,
                reviewCount: product.review,

                category: {
                    connect: { id: product.categoryId }
                }
            }
        });
    }
}
main().catch((e) => {
    console.error(e);
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect();
})


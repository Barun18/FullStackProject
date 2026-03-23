
import dotenv from "dotenv";
dotenv.config({path: "../.env"});

import { products,categories } from "./productData.js"
import { PrismaClient } from "@prisma/client"


if(!process.env.DATABASE_URL){
    throw new Error("DATABASE_URL is missing")
}
const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
});

async function main(){
        
    // for (let category of categories ){
    //     await prisma.category.create({
    //         data: category,
<<<<<<< HEAD
    //         skipDuplicates: true,
=======
>>>>>>> 0b257a29eeaa3db8b4d0d82054303be09246ac0c
    //     });
    // }
    
    // for (let product of products ){
    //     await prisma.product.create({
    //         data: product,
<<<<<<< HEAD
    //         skipDuplicates: true,
=======
>>>>>>> 0b257a29eeaa3db8b4d0d82054303be09246ac0c
    //     });
    // }
}
    main().catch((e) => {
        console.error(e);
        process.exit(1)
    }).finally(async () => {
        await prisma.$disconnect();
    })


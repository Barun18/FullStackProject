
// import {Data} from "../Data/Data";
// import type { Product } from '../Type/product'

// export const getProductData =  () : Product[] => {
//    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]")
// return [...Data, ...storedProducts];
// }

export async function getProductData (){
   const res = await fetch("http://localhost:5000/products");
   if(!res.ok){
      throw new Error("failed to fetch products");
   }
   return res.json();
} 
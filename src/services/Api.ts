//! fetching locally stored data 
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

export async function getSingleProduct(id: string){
    const res = await fetch(`http://localhost:5000/products/${id}`)

    if(!res.ok){
      throw new Error("Failed to fetch product");
    }
    return res.json();
}

//TODO:-- api call to submit user's registration data into server
//? Basic structure.
// export async function createAccount(data: any){
//   const res = await fetch("http://localhost:5000/register", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   return res.json();
// }
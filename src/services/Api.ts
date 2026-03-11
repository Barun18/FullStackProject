
import {Data} from "../Data/Data";
import type { Product } from '../Type/product'

export const getProductData =  () : Product[] => {
   const storedProducts = JSON.parse(localStorage.getItem("products") || "[]")
return [...Data, ...storedProducts];
}
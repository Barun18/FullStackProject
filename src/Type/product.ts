 export type Product = {
  id: number;
  title: string;
  price: number;
  img: string;
  productDate?: string;
  review: string;
  rating: number
  productAvailability?: boolean;
  category: {
    id:number;
    name:string;
  };
  type: string;
  details?: Record<string, string>;
  season?: "Summer" | "Winter" | "Winter-Spring" | "Summer-Early-Autumn"
};


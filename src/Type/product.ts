 export type Product = {
  id: number;
  title: string;
  price: number;
  img: string;
  productDate?: string;
  review: string;
  rating: number
  productAvailability?: boolean;
  category: "Fruits" | "Fashion" | "Grossary" | "Electronics" | "Shoe" | "Beauty";
  group?: string,
  type: string;
  details?: Record<string, string>;
  season?: "Summer" | "Winter" | "Winter-Spring" | "Summer-Early-Autumn"
};


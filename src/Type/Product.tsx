export type Product = {
  id: number;
  title: string;
  price: number;
  img?: string;
  type?: string;
  rating?: number;
  reviewCount?: number;

  category: {
    id: number;
    name: string;
  };
};
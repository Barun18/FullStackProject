import { create } from "zustand";

type CartItem = {
  id: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    title: string;
    price: number;
    img?: string;
  };
};

type CartStore = {
  cartItems: CartItem[];
  totalQty: number;

  fetchCart: () => Promise<void>;
  addToCart: (productId: number) => Promise<void>;
  increaseQty: (productId: number) => Promise<void>;
  decreaseQty: (productId: number) => Promise<void>;
};

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  totalQty: 0,

  fetchCart: async () => {
    const res = await fetch("http://localhost:5000/cart/1", {
      credentials: "include",
    });
    const data = await res.json();

    const total = data.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0
    );

    set({ cartItems: data, totalQty: total });
  },

  addToCart: async (productId) => {
    await fetch("http://localhost:5000/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: 1, productId }),
    });

    await useCartStore.getState().fetchCart();
  },

  increaseQty: async (productId) => {
    await fetch("http://localhost:5000/cart/increase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        userId: 1,
        productId }),
    });

    await useCartStore.getState().fetchCart();
  },

  decreaseQty: async (productId) => {
    await fetch("http://localhost:5000/cart/decrease", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        userId: 1,
        productId }),
    });

    await useCartStore.getState().fetchCart();
  },
}));
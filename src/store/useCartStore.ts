import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type CartItem = {
    id: number;
    title: string;
    price: number;
    img: string;
    review: string;
    rating: number;
    category: string;
    quantity: number,

}
type CartStore = {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, "quantity">) => void;
    increaseQty: (id: number) => void;
    decreaseQty: (id: number) => void;

}
const useCartStore = create<CartStore>()(
    persist<CartStore>(
        (set) => ({
            items: [],

            addToCart: (item) =>
                set((state) => {
                    const exists = state.items.find((i) => i.id === item.id);

                    if (exists) {
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id
                                    ? { ...i, quantity: i.quantity + 1 }
                                    : i
                            ),
                        };
                    }
                    return {
                        items: [...state.items, { ...item, quantity: 1 }],
                    };

                }),
            increaseQty: (id) =>
                set((state) => ({
                    items: state.items.map((i) =>
                        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                })),

            decreaseQty: (id) =>
                set((state) => ({
                    items: state.items.map((i) =>
                        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
                    ).filter((i) => i.quantity > 0),
                }))
        }),

        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useCartStore;
import { useEffect } from "react";
import { useCartStore } from "../store/useCartStore";
import CartItem from "../components/CartItem";

function CartPage() {
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    fetchCart(); // load cart from DB
  }, []);

  return <CartItem />;
}

export default CartPage;
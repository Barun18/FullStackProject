

import { useEffect, useState } from "react";
import { useCartStore } from "../store/useCartStore";
import CartItem from "../components/CartItem";

type Props = {
  user: any;
}
function Cart({ user }: any) {
  const fetchCart = useCartStore((state) => state.fetchCart);
  const clearCart = useCartStore((state) => state.clearCart);
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      clearCart();
    }
  }, [user]);
  if (!user) return <p>please Login to view cart</p>

  return <CartItem />;
}

export default Cart;


import { useEffect, useState } from "react";
import { useCartStore } from "../store/useCartStore";
import CartItem from "../components/CartItem";

function CartPage() {
  const fetchCart = useCartStore((state) => state.fetchCart);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/me", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        setUser(data.user);

        if (data.user) {
          fetchCart(); //If user logged in we can can fetchcart();
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>Please login to view cart</p>;

  return <CartItem />;
}

export default CartPage;
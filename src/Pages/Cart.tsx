

import { useEffect } from "react";
import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom";

type Props = {
  user: any;
};

function Cart({ user }: Props) {
  const navigate = useNavigate();

  const cartItems = useCartStore((state) => state.cartItems);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      clearCart();
    }
  }, [user]);

  if (!user) return <p>Please login to view cart</p>;

  if (!cartItems || cartItems.length === 0) {
    return <p>Your cart is empty</p>;
  }

  //  Calculate total
  const total = cartItems.reduce(
    (sum: number, item: any) =>
      sum + item.quantity * item.product.price,
    0
  );

  //  Handle Confirm Order
  const handleConfirmOrder = () => {
    const items = cartItems.map((item: any) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    navigate("/buy", {
      state: { items },
    });
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">My Cart</h2>

      <div className="flex flex-col gap-4">
        {cartItems.map((item: any) => (
          <div
            key={item.id}
            className="flex gap-4 items-center border p-3 rounded"
          >
            <img
              src={item.product.img}
              alt={item.product.title}
              className="w-16 h-16"
            />

            <div>
              <p className="font-semibold">{item.product.title}</p>
              <p>₹{item.product.price}</p>
              <p>Qty: {item.quantity}</p>
              <p>
                Subtotal: ₹
                {item.product.price * item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/*  Total */}
      <h3 className="mt-5 text-lg font-bold">
        Total: ₹{total}
      </h3>

      {/*  Confirm Order Button */}
      <button
        onClick={handleConfirmOrder}
        className="bg-green-500 px-4 py-2 mt-4 rounded"
      >
        Confirm Your Order
      </button>
    </div>
  );
}

export default Cart;
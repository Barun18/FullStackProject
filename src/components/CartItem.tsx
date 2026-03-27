

import { useCartStore } from "../store/useCartStore";

function CartItem() {
  const { cartItems, increaseQty, decreaseQty } = useCartStore();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-wrap gap-6">
      {cartItems.map((item) => (
        <div key={item.id} className="w-60 border p-3 rounded">
          <img src={item.product.img} className="h-40 w-full" />

          <h3>{item.product.title}</h3>
          <p>₹{item.product.price}</p>

          <div className="flex gap-3">
            <button onClick={() => decreaseQty(item.productId)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQty(item.productId)}>+</button>
          </div>

          <p>₹{item.product.price * item.quantity}</p>
        </div>
      ))}

      <h2>Total: ₹{totalPrice}</h2>
    </div>
  );
}

export default CartItem;
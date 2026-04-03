

import { useCartStore } from "../store/useCartStore";
import type { Product } from "../Type/Product";
import { useNavigate } from "react-router-dom";

type Props = {
  product: Product;
  user: any;
};

function ProductCard({ product, user }: Props) {

  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.cartItems);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);

  const navigate = useNavigate();

  const cartItem = cartItems.find((item) => (
    item.productId === product.id));



  const handleBuyNow = () => {
    if (!user) {
      alert("Please sign in first or create an account");
      navigate("/signin");
      return;
    }
    navigate("/buy", {
      state: {
        items: [
          { productId: product.id, quantity: 1 }
        ]
      }
    });
  };


  return (
    <div className="border rounded-lg shadow p-4 w-60">
      <img src={product.img} className="w-full h-40 object-cover"
        onClick={() => navigate(`/product/${product.id}`)}
        style={{ cursor: "pointer" }}
      />

      <h3 className="text-white">{product.title}</h3>
      <p className="text-white">₹{product.price}</p>

      <div className="flex gap-3.5">
        {cartItem ? (
          <div className="flex items-center gap-2 mt-2">
            <button onClick={() => decreaseQty(product.id)}
              className="bg-red-500 px-2">
              -
            </button>
            <span className="text-white">{cartItem.quantity}</span>
            <button onClick={() => increaseQty(product.id)}
              className="bg-green-500 px-2">
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product.id)}
            className="bg-blue-500 px-2 py-1 mt-2"
          >
            Add to Cart
          </button>
        )}
        <button
          onClick={handleBuyNow}
          className="bg-blue-500 px-2 py-1 mt-2"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

import useCartStore from "../store/useCartStore";
import type { Product } from "../Type/product";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

type Props = {
  product: Product;
}

function ProductCard({ product }: Props) {

  const items = useCartStore((state) => state.items)
  const addToCart = useCartStore((state) => state.addToCart)
  const increaseQty = useCartStore((state) => state.increaseQty)
  const decreaseQty = useCartStore((state) => state.decreaseQty)

  const cartItem = items.find((item) => item.id === product.id)

  const handleAddToCart = () => {

    addToCart(product);
  }


  return (
    <div className="border rounded-lg shadow p-4 w-60">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.img}
          alt={product.title}
          className="h-40 w-full object-cover rounded"
        />
      </Link>

      <h3 className="mt-2 font-semibold text-white">{product.title}</h3>
      <p className=" text-white">₹{product.price}</p>
      <p className="text-white">Review:-{product.review}</p>

      <p className="text-white flex items-center gap-1">
        <FaStar size={20} className="text-yellow-400"
        />:{product.rating}/5
      </p>

      {!cartItem ? (
        <button
          onClick={handleAddToCart}
          className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add to Cart
        </button >
      ) : (
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => decreaseQty(product.id)}
            className="bg-blue-800 px-2">
            -
          </button>
          <span className="bg-blue-800 px-2">{cartItem.quantity}</span>
          <button
            onClick={() => increaseQty(product.id)}
            className="bg-blue-800 px-2"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
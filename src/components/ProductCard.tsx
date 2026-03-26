
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import type { Product } from '../Type/Product'
type Props = {
  product: Product;
}

function ProductCard({ product }: Props) {


  const handleAddToCart = () => {

  }


  return (
    <div className="border rounded-lg shadow p-4 w-60">
      <img
        src={product.img}
        alt={product.title}
        className="w-full h-40 object-cover"
      />
      <h3 className="mt-2 font-semibold text-white">Product</h3>
      <p className=" text-white">₹product-price</p>
      <p className="text-white">Review:-product-review</p>

      <p className="text-white flex items-center gap-1">
        <FaStar size={20} className="text-yellow-400"
        />:product-rating/5
      </p>

      {/* {!cartItem ? (
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
      )} */}
    </div>
  );
}

export default ProductCard;
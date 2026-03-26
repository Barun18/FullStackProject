
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import type { Product } from '../Type/Product'

type Props = {
  product: Product;
  cartQty?: number;
  onAdd: (product: Product) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
}

function ProductCard({
  product,
  cartQty,
  onAdd,
  onIncrease,
  onDecrease }: Props) {


  const handleAddToCart = () => {

  }


  return (
    <div className="border rounded-lg shadow p-4 w-60">
      <img
        src={product.img}
        alt={product.title}
        className="w-full h-40 object-cover"
      />
      <h3 className="mt-2 font-semibold text-white">{product.title}</h3>
      <p className=" text-white">₹{product.price}</p>
      <p className="text-white">Review:-{product.reviewCount}</p>

      <p className="text-white flex items-center gap-1">
        <FaStar size={20} className="text-yellow-400"
        />:{product.rating}/5
      </p>

      {!cartQty ? (
        <button
          onClick={() => onAdd(product)}
          className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onDecrease(product.id)}
            className="bg-blue-800 px-2"
          >
            -
          </button>
          <span className="bg-blue-800 px-2">{cartQty}</span>
          <button
            onClick={() => onIncrease(product.id)}
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
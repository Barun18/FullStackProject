

import { useCartStore } from "../store/useCartStore";
import type { Product } from "../Type/Product";
import { useNavigate } from "react-router-dom";

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();


  return (
    <div className="border rounded-lg shadow p-4 w-60">
      <img src={product.img} className="w-full h-40 object-cover" 
      onClick={() => navigate(`/product/${product.id}`)}
      style={{ cursor: "pointer" }}
      />
      
      <h3 className="text-white">{product.title}</h3>
      <p className="text-white">₹{product.price}</p>

      <button
        onClick={() => addToCart(product.id)}
        className="bg-blue-500 px-3 py-1 mt-2"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
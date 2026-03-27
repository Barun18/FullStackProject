
// import { FaStar } from "react-icons/fa";
// import type { Product } from '../Type/Product'

// type Props = {
//   product: Product;
//   cartQty?: number;
//   onAdd: (product: Product) => void;
//   onIncrease: (id: number) => void;
//   onDecrease: (id: number) => void;
// }

// function ProductCard({
//   product,
//   cartQty=0,
//   onAdd,
//   onIncrease,
//   onDecrease,
// }: Props) {


//   const handleAddToCart = async (product: Product) => {
//     await fetch("http://localhost:5000/cart/add", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify({
//         userId: 1,
//         productId: product.id,
//       }),
       
//     });
//     onAdd(product);  //TODO:-- Update Local UI
//     window.dispatchEvent(new Event("cartUpdated"));
//   };

//   return (
//     <div className="border rounded-lg shadow p-4 w-60">
//       <img
//         src={product.img}
//         alt={product.title}
//         className="w-full h-40 object-cover"
//       />
//       <h3 className="mt-2 font-semibold text-white">{product.title}</h3>
//       <p className=" text-white">₹{product.price}</p>
//       <p className="text-white">Review:-{product.reviewCount}</p>

//       <p className="text-white flex items-center gap-1">
//         <FaStar size={20} className="text-yellow-400"
//         />:{product.rating}/5
//       </p>

//       {cartQty > 0 ? (
//         <div className="flex items-center gap-2 mt-2">
//           <button onClick={() => onDecrease(product.id)}>-</button>
//           <span>{cartQty}</span>
//           <button onClick={() => onIncrease(product.id)}>+</button>
//         </div>
//       ) : (
//         <button onClick={() => handleAddToCart(product)}>
//           Add to Cart
//         </button>
//       )}

//     </div>
//   );
// }

// export default ProductCard;



import { useCartStore } from "../store/useCartStore";
import type { Product } from "../Type/Product";

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="border rounded-lg shadow p-4 w-60">
      <img src={product.img} className="w-full h-40 object-cover" />
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
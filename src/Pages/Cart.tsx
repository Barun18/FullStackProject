// import "../Css/Cart.css";
// import type { Product } from "../Type/Product";

// type Props = {
//   items: Product[];
//   cart: { [key: number]: number };
//   onIncrease: (id: number) => void;
//   onDecrease: (id: number) => void;
// };

// function AllCartItem({ items, cart, onIncrease, onDecrease }: Props) {

//   const totalPrice = items.reduce(
//     (sum, item) => sum + item.price * cart[item.id],
//     0
//   );

//   return (
//     <div className="border rounded-lg shadow p-4 flex gap-8 flex-wrap">
      
//       {items.map((i) => (
//         <div key={i.id} className="w-60 border p-3 rounded">
//           <img
//             src={i.img}
//             alt={i.title}
//             className="h-40 w-full object-cover rounded"
//           />

//           <h3 className="text-black">{i.title}</h3>
//           <h3 className="text-black">₹{i.price}</h3>

//           <div className="flex bg-blue-400 gap-4 font-bold p-2 items-center justify-center">
            
//             <button onClick={() => onDecrease(i.id)}>
//               <h2 className="text-black">-</h2>
//             </button>

//             <h3 className="text-red-600">
//               Qty: {cart[i.id]}
//             </h3>

//             <button onClick={() => onIncrease(i.id)}>
//               <h2 className="text-black">+</h2>
//             </button>

//           </div>

//           <h3 className="text-black font-bold">
//             Price: ₹{i.price * cart[i.id]}
//           </h3>
//         </div>
//       ))}

//       <h2 className="m-10 font-bold text-xl">
//         Total Price: ₹{totalPrice}
//       </h2>
//     </div>
//   );
// }

// export default AllCartItem;








import { useEffect } from "react";
import { useCartStore } from "../store/useCartStore";
import CartItem from "../components/CartItem";

function CartPage() {
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    fetchCart();
  }, []);

  return <CartItem />;
}

export default CartPage;
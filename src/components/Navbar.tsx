
// import '../Css/Navbar.css'
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { useCartStore } from "../store/useCartStore";

// type CartItem = {
//   id: number;
//   productId: number;
//   quantity: number;
//   price: number;
// };

// function Navbar() {

//   const navigate = useNavigate();
//   const [searchInput, setSearchInput] = useState("");
//   const [totalQty, setTotalQty] = useState(0);
//   const [cartItems, setcartItems] = useState<CartItem[]>([]);
//   const location = useLocation();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (searchInput.trim() === "") return;
//       // setSearch(searchInput);
//       if (location.pathname !== "/search") {
//         navigate("/search");
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchInput]);
//   console.log(location.pathname)


//   const fetchCartCount = async () => {
//     const res = await fetch("http://localhost:5000/cart/1");
//     const data = await res.json();
//     const total = data.reduce(
//       (sum: number, item: any) => sum + item.quantity,
//       0
//     );
//     setTotalQty(total);
//   };

//   useEffect(() => {
//     fetchCartCount();
//   })

//   useEffect(() => {
//     const handdleCartUpdate = () => {
//       fetchCartCount();
//     }
//     window.addEventListener("cartUpdated", handdleCartUpdate);
//     return () => {
//       window.removeEventListener("cartUpdated", handdleCartUpdate);
//     };
//   }, []);


//   return (
//     <div
//       className="flex justify-between items-center p-4
//      bg-gray-800 text-white">
//       <button
//         className="cursor-pointer"
//         onClick={() =>
//           navigate("/")}>
//         Home
//       </button>

//       <input
//         name="search"
//         placeholder="search product"
//         onChange={(e) => setSearchInput(e.target.value)}
//       />

//       <button
//         className={`bg-blue-400 px-3 m-3 
//       border-b-cyan-950 
//       ${(location.pathname === "/AddProduct")
//             ? "opacity-40 cursor-not-allowed"
//             : "cursor-pointer"}`}
//         onClick={() =>
//           navigate("/AddProduct")
//         }
//         disabled={location.pathname === "/AddProduct"}>
//         Add New Product
//       </button>


//       <button
//         className={`bg-blue-400 px-3 m-3 
//       border-b-cyan-950 
//       ${location.pathname === "/AdminPage"
//             ? "opacity-40 cursor-not-allowed"
//             : "cursor-pointer"}`}
//         onClick={() =>
//           navigate("/AdminPage")
//         }
//         disabled={location.pathname === "/AdminPage"}>
//         Admin
//       </button>

//       <button
//         className="cursor-pointer"
//         onClick={() =>
//           navigate("/cart")}>🛒:{totalQty}
//       </button>
//     </div>
//   )
// }


// export default Navbar;




import '../Css/Navbar.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCartStore } from "../store/useCartStore";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const [searchInput, setSearchInput] = useState("");

  // ✅ get cart count directly from Zustand
  const totalQty = useCartStore((state) => state.totalQty);
  const fetchCart = useCartStore((state) => state.fetchCart);

  // ✅ fetch cart once when app loads
  useEffect(() => {
    fetchCart();
  }, []);

  // 🔍 search logic (unchanged)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput.trim() === "") return;
      if (location.pathname !== "/search") {
        navigate("/search");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">

      <button onClick={() => navigate("/")}>
        Home
      </button>

      <input
        name="search"
        placeholder="search product"
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <button
        className={`bg-blue-400 px-3 m-3 
        ${location.pathname === "/AddProduct"
            ? "opacity-40 cursor-not-allowed"
            : "cursor-pointer"}`}
        onClick={() => navigate("/AddProduct")}
        disabled={location.pathname === "/AddProduct"}
      >
        Add New Product
      </button>

      <button
        className={`bg-blue-400 px-3 m-3 
        ${location.pathname === "/AdminPage"
            ? "opacity-40 cursor-not-allowed"
            : "cursor-pointer"}`}
        onClick={() => navigate("/AdminPage")}
        disabled={location.pathname === "/AdminPage"}
      >
        Admin
      </button>

      {/* ✅ Cart count from Zustand */}
      <button onClick={() => navigate("/cart")}>
        🛒 {totalQty}
      </button>

    </div>
  );
}

export default Navbar;
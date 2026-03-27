

import '../Css/Navbar.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCartStore } from "../store/useCartStore";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const [searchInput, setSearchInput] = useState("");

  //  get cart count directly from Zustand
  const totalQty = useCartStore((state) => state.totalQty);
  const fetchCart = useCartStore((state) => state.fetchCart);

  //  fetch cart once when app loads
  useEffect(() => {
    fetchCart();
  }, []);

  //  search logic (unchanged)
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

      {/*  Cart count from Zustand */}
      <button onClick={() => navigate("/cart")}>
        🛒 {totalQty}
      </button>

    </div>
  );
}

export default Navbar;
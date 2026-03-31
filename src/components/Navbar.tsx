
import '../Css/Navbar.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCartStore } from "../store/useCartStore";
import { FaUserCircle } from 'react-icons/fa';


function Navbar({ user, loadUser}: any) {

  const navigate = useNavigate();
  const location = useLocation();

  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);

  //  get cart count directly from Zustand
  const totalQty = useCartStore((state) => state.totalQty);
  const fetchCart = useCartStore((state) => state.fetchCart);


  //  fetch cart once when app loads
  useEffect(() => {
    if(user)
    fetchCart();
  }, [user]);

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

      <button onClick={() => navigate("/cart")}>
        🛒 {totalQty}
      </button>

      <div className="relative"
      onMouseLeave={() => setOpen(false)}>
        <div
          onClick={() => setOpen(!open)}
          className="w-8 h-8 bg-gray-400 rounded-full flex items-center">
          <FaUserCircle size={28} />
        </div>
        {open && (
          <div className="absolute right-0 top-ful w-44
          bg-gray-800 text-white border border-gray-600
          rounded-lg shadow-lg z-50 flex flex-col">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-700"
            onClick={() => navigate(`/profile`)}
            >
              Profile
            </button>

            <button className="w-full text-left px-4 py-2 hover:bg-gray-700"
            onClick={() => navigate(`/profile?tab=orders`)}>
              Orders
            </button>

            <button className="w-full text-left px-4 py-2 hover:bg-gray-700"
            onClick={async () => {
              if(user) {
                await fetch("http://localhost:5000/signout",{
                  method: "POST",
                  credentials: "include",
                });
                loadUser(null);
                useCartStore.getState().clearCart();

                navigate("/signin");
              }else{
                navigate("/signin");
                
              }
            }}>
              {user ? "signout" : "signin"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

import '../Css/Navbar.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Navbar() {

  // const item = useCartStore((state) => state.items)
  // const totalQty = item.reduce((sum, item) =>
  //   sum + item.quantity, 0)

  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");

  const location = useLocation();

  useEffect(() => {

    const timer = setTimeout(() => {

      if (searchInput.trim() === "") return;

      // setSearch(searchInput);

      if (location.pathname !== "/search") {
        navigate("/search");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);
  console.log(location.pathname)

  return (
    <div
      className="flex justify-between items-center p-4
     bg-gray-800 text-white">
      <button
        className="cursor-pointer"
        onClick={() =>
          navigate("/")}>
        Home
      </button>

      <input
        name="search"
        placeholder="search product"
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <button
        className={`bg-blue-400 px-3 m-3 
      border-b-cyan-950 
      ${(location.pathname === "/AddProduct" )
        ? "opacity-40 cursor-not-allowed"
      : "cursor-pointer"}`}
        onClick={() =>
          navigate("/AddProduct")
        }
        disabled={location.pathname ==="/AddProduct" }>
        Add New Product
      </button>


      <button
        className={`bg-blue-400 px-3 m-3 
      border-b-cyan-950 
      ${location.pathname === "/AdminPage" 
        ? "opacity-40 cursor-not-allowed"
      : "cursor-pointer"}`}
        onClick={() =>
          navigate("/AdminPage")
        }
        disabled={location.pathname ==="/AdminPage"}>
          Admin
      </button>

      <button
        // className="cursor-pointer"
        // onClick={() =>
        //   navigate("/cart")}>🛒:{totalQty}
      ></button>
    </div>
  )
}


export default Navbar;
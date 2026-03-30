import './App.css'
import { useEffect, useState } from "react";
import Navbar from '../src/components/Navbar'
import Home from './Pages/Home';
import AddProduct from './Pages/AddProduct';
import AdminPage from './Pages/AdminPage';
import Cart from './Pages/Cart';
import ProductDetails from './Pages/ProductDetails';
import GroupProduct from './Pages/groupProduct';
import { Routes, Route } from 'react-router-dom';
import SearchProduct from './Pages/searchproduct';
import CreatedAccount from './Pages/signup';
import SignIn from './Pages/signin';
import SignOut from './Pages/SignOut';
import ProfilePage from './Pages/ProfilePage';
import BuyPage from './Pages/buyPage';
import Payment from './Pages/payment';



function App() {
  const [user, setUser] = useState(null);
  const loadUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/me", {
        credentials: "include",
      });
      const data = await res.json();
      setUser(data.user);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);


  return (
    <>
      <div className="main">
        <Navbar user={user} setUser={setUser} loadUser={loadUser} />
        <Routes>

          <Route path="/" element={<Home user={user} />} />
          <Route path="/search" element={<SearchProduct />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          {/* <Route path="/AddProduct/:id" element={<AddProduct />} /> */}
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/cart" element={<Cart user={user}/>} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/group/:groupName" element={<GroupProduct />} />
          <Route path="/signup" element={<CreatedAccount />} />
          <Route path="/signin" element={<SignIn loadUser={loadUser} />} />
          <Route path="/signout" element={<SignOut loadUser={loadUser} />} />
          <Route path="/group/:groupName" element={<GroupProduct />} />
          <Route path="/buy/:id" element={<BuyPage />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/profile" element={<ProfilePage/>} />
        </Routes>

      </div>

    </>
  )
}

export default App

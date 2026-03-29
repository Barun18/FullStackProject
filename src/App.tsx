import './App.css'
import Navbar from '../src/components/Navbar'
import Home from './Pages/Home'
import CartPage from './Pages/CartPage';
import AddProduct from'./Pages/AddProduct';
import AdminPage from './Pages/AdminPage';
import ProductDetails from './Pages/ProductDetails';
import GroupProduct from './Pages/groupProduct';
import { Routes ,Route} from 'react-router-dom';
import SearchProduct from './Pages/searchproduct';
import CreatedAccount from './Pages/signup';
import SignIn from './Pages/signin';
import Logout from './Pages/logout';
import BuyPage from './Pages/buyPage';
import Payment from './Pages/payment';



function App() {

  return (
    <>
     <div className="main">
      <Navbar/>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchProduct/>}/>
        <Route path="/AddProduct" element={<AddProduct />}/>
        <Route path="/AddProduct/:id" element={<AddProduct />}/>
        <Route path="/AdminPage" element={<AdminPage />}/>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/group/:groupName" element={<GroupProduct />} />
        <Route path="/register" element={<CreatedAccount />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/group/:groupName" element={<GroupProduct/>}/>
        <Route path="/buy/:id" element={<BuyPage/>}/>
        <Route path="/payment/:id" element={<Payment />}/>
        
      </Routes>
  
      </div>
     
    </>
  )
}

export default App

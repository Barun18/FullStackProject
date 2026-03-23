import './App.css'
import Navbar from '../src/components/Navbar'
import Home from './Pages/Home'
import Cart from './Pages/Cart';
import AddProduct from'./Pages/AddProduct';
import AdminPage from './Pages/AdminPage';
<<<<<<< HEAD
import ProductDetails from './Pages/ProductDetails';
import GroupProduct from './Pages/groupProduct';
import { Routes ,Route} from 'react-router-dom';
import SearchProduct from './Pages/searchproduct';
import CreatedAccount from './Pages/signup';
import SignIn from './Pages/signin';
import Logout from './Pages/logout';
=======
import ProductAbout from './Pages/ProductDetails';
import GroupProduct from './Pages/groupProduct';
import { Routes ,Route} from 'react-router-dom';
import SearchProduct from './Pages/searchproduct';
>>>>>>> 0b257a29eeaa3db8b4d0d82054303be09246ac0c

function App() {

  return (
    <>
     <div className="main">
      <Navbar/>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Home />} />
=======
        <Route path="/" element={<Home/>}/>
>>>>>>> 0b257a29eeaa3db8b4d0d82054303be09246ac0c
        <Route path="/search" element={<SearchProduct/>}/>
        <Route path="/AddProduct" element={<AddProduct />}/>
        <Route path="/AddProduct/:id" element={<AddProduct />}/>
        <Route path="/AdminPage" element={<AdminPage />}/>
<<<<<<< HEAD
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/group/:groupName" element={<GroupProduct />} />
        <Route path="/register" element={<CreatedAccount />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/logout" element={<Logout />} />
=======
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/product/:id" element={<ProductAbout/>}/>
        <Route path="/group/:groupName" element={<GroupProduct/>}/>
        
>>>>>>> 0b257a29eeaa3db8b4d0d82054303be09246ac0c
      </Routes>
  
      </div>
     
    </>
  )
}

export default App

import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Collections from './pages/Collections'
import About from './pages/About'
import Contact from './pages/Contact'
import Products from './pages/Products'
import Carts from './pages/Carts'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Missing from "./pages/Missing"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import SearchBar from "./components/SearchBar"
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from "./pages/Verify"



const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/collection" element={<Collections />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/collection" element={<Collections />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/product/:productId" element={<Products />}/>
        <Route path="/cart" element={<Carts />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/place-order" element={<PlaceOrder />}/>
        <Route path="/order" element={<Orders />}/>
        <Route path="/verify" element={<Verify />}/>
        <Route path="*" element={<Missing />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
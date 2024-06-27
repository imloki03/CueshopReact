import logo from './logo.svg';
import './App.css';
import Nav from "./components/Nav";
import ProductCard from "./components/ProductCard";
import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Github from "./components/GithubTest";
import Callback from "./components/Callback";
import Register from "./components/Register/Register";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/CheckOut/Checkout";
import Search from "./components/Search/Search"
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="product/detail/:id" element={<ProductDetail/>} />
                <Route path="cart" element={<Cart/>} />
                <Route path="checkout" element={<Checkout/>} />
                <Route path="search/:query" element={<Search/>} />
                <Route path="forgotpassword" element={<ForgotPassword/>} />
                <Route path="github" element={<Github />} />
                <Route path="callback" element={<Callback />}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

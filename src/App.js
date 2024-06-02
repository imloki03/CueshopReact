import logo from './logo.svg';
import './App.css';
import Nav from "./components/Nav";
import ProductCard from "./components/ProductCard";
import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

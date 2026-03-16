// ============================================================
// src/App.jsx
// ------------------------------------------------------------
// CHANGES FROM ORIGINAL:
//  1. Imported the new Cart page
//  2. Added a route for /cart
// ============================================================

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home.jsx';
import OurStory from "./pages/OurStory/OurStory.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import ProductDetail from "./pages/ProductDetail/ProductDetail.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import { allProducts } from './data/products';
import LogIn from "./pages/LogIn/LogIn.jsx";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ourstory" element={<OurStory />} />
        <Route path="/shop" element={<Shop allProducts={allProducts} />} />
        <Route path="/product/:id" element={<ProductDetail allProducts={allProducts} />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/cart" element={<Cart />} />

        {/* 404 Not Found - Catch all unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
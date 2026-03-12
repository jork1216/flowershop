import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home.jsx'
import OurStory from "./pages/OurStory/OurStory.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import ProductDetail from "./pages/ProductDetail/ProductDetail.jsx";
import { allProducts } from './data/products';

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ourstory" element={<OurStory />} />
        
        {/* Pass the data here */}
        <Route path="/shop" element={<Shop allProducts={allProducts} />} />
        
        {/* And pass it here */}
        <Route path="/product/:id" element={<ProductDetail allProducts={allProducts} />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home.jsx'
import OurStory from "./pages/OurStory/OurStory.jsx";
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ourstory" element={<OurStory />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

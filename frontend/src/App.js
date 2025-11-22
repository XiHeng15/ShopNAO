import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Browse from './pages/Browse.js';
import Cart from './pages/Cart.js';
import About from './pages/About.js';
import Login from './pages/Login.js';
import Product from './pages/Product.js';

import Navbar from './components/Navbar.js';

import "./App.css"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/browse" element={<Browse/>}/>
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </Router>
  );
}

export default App;

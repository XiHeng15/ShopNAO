import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Browse from './pages/browse';
import Cart from './pages/cart';
import About from './pages/about';
import Navbar from './components/Navbar';
import "./App.css"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/browse" element={<Browse/>}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/about" element={<About />}/>
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Browse from './pages/browse';
import Cart from './pages/cart';
import Navbar from './components/navbar';
import "./App.css"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path ="/browse" element={<Browse/>}/>
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;

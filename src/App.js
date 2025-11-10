import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Cart from './pages/Cart';
import About from './pages/About';
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
        <Route path="/login" element={<Login />}/>
      </Routes>
    </Router>
  );
}

export default App;

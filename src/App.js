import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <Navbar className="Navbar"/> {/*Puts navbar at top*/}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          ShopNAO. The best shopping experience North of the equator.
        </p>
      </header>
    </div>
  );
}

export default App;

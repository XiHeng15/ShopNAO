import React from 'react';
import "./Cart.css"

function Cart() {
  return(
    <div className="Cart">
      <header className="Cart-header">
        <h1>YOUR CART!</h1>
        <p>
          Your cart is currently empty. (or full of hammers. we dont know)
        </p>
      </header>
    </div>
  
  );
}

export default Cart;

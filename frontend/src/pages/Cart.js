import { useState, useEffect } from "react";
import "./Cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch cart on load
  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:5000/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setCart(data))
      .catch(console.error);
  }, [token]);

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return; // prevent negative or 0 quantity
    fetch("http://localhost:5000/api/cart/update", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ productId, quantity }),
    })
      .then(res => res.json())
      .then(data => setCart(data.cart))
      .catch(console.error);
  };

  const removeItem = (productId) => {
    fetch("http://localhost:5000/api/cart/remove", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ productId }),
    })
      .then(res => res.json())
      .then(data => setCart(data.cart))
      .catch(console.error);
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="Cart">
      <h2>Your Cart</h2>
      {cart.length === 0 && <p>Your cart is empty</p>}
      {cart.map(item => (
        <div key={item.product._id} className="CartItem">
          <img src={"http://localhost:5000" + item.product.img} alt={item.product.message} />
          <h3>{item.product.message}</h3>
          <p>${item.product.price.toFixed(2)}</p>
          <input
            type="number"
            min={1}
            value={item.quantity}
            onChange={e => updateQuantity(item.product._id, parseInt(e.target.value))}
          />
          <button onClick={() => removeItem(item.product._id)}>Remove</button>
        </div>
      ))}
      {cart.length > 0 && <h3>Total: ${totalPrice.toFixed(2)}</h3>}
    </div>
  );
}

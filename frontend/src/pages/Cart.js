import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext.js";
import "./Cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const { user, logout } = useContext(UserContext);

  useEffect(() => {
    if (!user.token) return;

    fetch("http://localhost:5000/api/cart", {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          logout(); // auto logout on invalid token
          throw new Error("Invalid token, logged out");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setCart(data);
        else if (Array.isArray(data.cart)) setCart(data.cart);
        else setCart([]);
      })
      .catch(console.error);
  }, [user.token, logout]);

  const updateQuantity = (productId, quantity, stock) => {
    if (!user.token || quantity < 1 || quantity > stock) return;

    fetch("http://localhost:5000/api/cart/update", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        Authorization: `Bearer ${user.token}` 
      },
      body: JSON.stringify({ productId, quantity }),
    })
      .then((res) => {
        if (res.status === 401) { logout(); throw new Error("Invalid token"); }
        return res.json();
      })
      .then((data) => setCart(Array.isArray(data.cart) ? data.cart : []))
      .catch(console.error);
  };

  const removeItem = (productId) => {
    if (!user.token) return;

    fetch("http://localhost:5000/api/cart/remove", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        Authorization: `Bearer ${user.token}` 
      },
      body: JSON.stringify({ productId }),
    })
      .then((res) => {
        if (res.status === 401) { logout(); throw new Error("Invalid token"); }
        return res.json();
      })
      .then((data) => setCart(Array.isArray(data.cart) ? data.cart : []))
      .catch(console.error);
  };

  const totalPrice = (Array.isArray(cart) ? cart : []).reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="Cart">
      <h2>Your Cart</h2>
      {cart.length === 0 && <p>Your cart is empty</p>}
      {cart.map((item) => (
        <div key={item.product._id} className="CartItem">
          <img src={"http://localhost:5000" + item.product.img} alt={item.product.message} />
          <h3>{item.product.message}</h3>
          <p>${item.product.price.toFixed(2)}</p>
          <input
            type="number"
            min={1}
            max={item.product.stock}
            value={item.quantity}
            onChange={(e) => updateQuantity(item.product._id, parseInt(e.target.value), item.product.stock)}
          />
          <button onClick={() => removeItem(item.product._id)}>Remove</button>
        </div>
      ))}
      {cart.length > 0 && <h3>Total: ${totalPrice.toFixed(2)}</h3>}
    </div>
  );
}

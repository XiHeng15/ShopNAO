import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext.js";
import "./Cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const { user, logout } = useContext(UserContext);

  useEffect(() => {
    if (!user?.token) return; //prevents error if user hasnt been initialized (errors from accessing cart when not logged in)

    fetch("http://localhost:5000/api/cart", {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          logout();
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
  }, [user?.token, logout]);

  const updateQuantity = (productId, quantity, stock) => {
    if (!user?.token || quantity < 1 || quantity > stock) return;

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
    if (!user?.token) return;

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

  const totalPrice = (cart || []).reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // Handle checkout
  const handleCheckout = async () => {
    if (!user?.token) return alert("You must be logged in");
    if (!cart.length) return alert("Cart is empty");

    const items = cart.map(item => ({
      productId: item.product._id,
      name: item.product.name, //changed to name
      quantity: item.quantity,
      priceAtPurchase: item.product.price,
    }));

    console.log("Checkout items:", items); // Debug: items sent to backend

    try {
      const res = await fetch("http://localhost:5000/api/payments/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      console.log("Stripe response:", data); // Debug Stripe session URL or error

      if (data.url) {
        console.log("Redirecting to Stripe Checkout...");
        window.location.href = data.url;
      } else if (data.error) {
        alert("Checkout failed: " + data.error);
      } else {
        alert("Unexpected error during checkout");
      }
    } catch (err) {
      console.error("Checkout request failed:", err);
      alert("Checkout request failed, see console for details");
    }
  };

  return (
    <div className="Cart">
      <h2>Your Cart</h2>
      {cart.length === 0 && <p>Your cart is empty</p>}
      {cart.map((item) => (
        <div key={item.product._id} className="CartItem">
          <img src={"http://localhost:5000" + item.product.img} alt={item.product.name} />
          <h3>{item.product.name}</h3>
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

      {cart.length > 0 && (
        <>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button onClick={handleCheckout} className="CheckoutButton">
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

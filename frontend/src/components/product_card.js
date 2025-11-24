import "./product_card.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// product-card component
export default function ProductCard({ id, img, message, price, review }) {
  const [count, setCount] = useState(1); // quantity
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // JWT

  const avgRating = review && review.length > 0
    ? (review.reduce((acc, r) => acc + r.score, 0) / review.length).toFixed(1)
    : null;

  // Add to cart function
  const handleAddToCart = async (e) => {
    e.stopPropagation(); // prevent navigating to product page
    if (!token) return alert("You must be logged in to add to cart!");

    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ productId: id, quantity: count })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add to cart");
      alert("Added to cart! Quantity: " + count);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="Card" onClick={() => id && navigate(`/product/${id}`)}>
      <h1>{message}</h1>
      <Item img={img} />
      <h3>${(price * count).toFixed(2)}</h3>
      <p>Quantity: {count}</p>
      <Counter count={count} setCount={setCount} />
      {avgRating ? (
        <h3>Rated {avgRating} /10 by {review.length} verified customers!</h3>
      ) : (
        <h3>No reviews yet</h3>
      )}
      <Button handleAddToCart={handleAddToCart} />
    </div>
  );
}

// Button component
function Button({ handleAddToCart }) {
  return (
    <div>
      <button onClick={handleAddToCart}>Add to cart NAO</button>
    </div>
  );
}

//product image
function Item({ img }) {
  const backendURL = "http://localhost:5000"; // backend base URL
  return <img src={backendURL + img} alt="" />;
}

// Quantity counter
function Counter({ count, setCount }) {
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => count > 1 && setCount(count - 1)}>-</button>
    </div>
  );
}

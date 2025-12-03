import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Product.css";

export default function Product() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1); // quantity
  const token = localStorage.getItem("token"); // JWT

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => console.error("Error loading product:", err));
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (!product) return <h2>Product not found</h2>;

  const avgRating = product.review && product.length > 0
    ? (product.review.reduce((acc, r) => acc + r.score, 0) / product.review.length).toFixed(1)
    : null;

  // constant for when +/- is pressed
  const handlePlusButton = async (e) => {
    e.stopPropagation(); // prevent navigating to product page
    count < product.stock && setCount(count + 1)
  };
  const handleMinusButton = async (e) => {
    e.stopPropagation(); // prevent navigating to product page
    count > 1 && setCount(count - 1)
  };

  // Add to cart function
  const handleAddToCart = async (e) => {
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
    <div className="ProductPage">
      
      <div className="ProductTitle">
        <h1>{product.message}</h1> 
      </div>

      <div className="ProductContent">
        <div className="ProductImage">
          <img 
            src={`http://localhost:5000${product.img}`}
            alt={product.message}
          />
        </div>
      
        
        <div className="ProductDetails">
          
          <h2>${product.price?.toFixed(2)}</h2>
          {product.description && <p>{product.description}</p>}
          <Button className ="AddToCart" handleAddToCart={handleAddToCart}/>
          
          <Counter count={count} setCount={setCount} handlePlusButton={handlePlusButton} handleMinusButton={handleMinusButton} />
          {avgRating ? (
            <h3>Rated {avgRating} /10 by {id.review.length} verified customers!</h3>
          ) : (
            <h3>No reviews yet</h3>
          )}
          <h2>Count: {count}</h2>

        </div>
      </div>
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

// Quantity counter
function Counter({ count, setCount, handlePlusButton, handleMinusButton }) {

  return (
    <div>
      <button onClick={handlePlusButton}>+</button>
      <button onClick={handleMinusButton}>-</button>
    </div>
  );
}

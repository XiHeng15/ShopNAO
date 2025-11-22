import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Browse.css";
import "../components/product_card.css";

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    // replace with your API endpoint
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  function handleClick() {
    alert("Item(s) are NAO purchased :D"); // temporary
  }

  return (
    <div className="Browse">
      <header className="Browse-header">
        <div className="Card">
          <h1>{product.message}</h1>
          <img src={product.item_img_url} alt={product.message} />
          <h3>${product.price * count}</h3>
          <p>Quantity: {count}</p>
          <div>
            <div style={{ marginTop: -20 }}></div>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => count > 1 && setCount(count - 1)}>-</button>
          </div>
          <div style={{ marginTop: 10 }}>
            <button onClick={handleClick}>Add to cart NAO</button>
          </div>
          <div style={{ marginTop: 20 }}>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
          <h3 style={{ marginTop: 20 }}>Ratings</h3>
          <div style={{ minHeight: 80, width: "90%", background: "rgba(255,255,255,0.08)", borderRadius: 8 }}>
            <p style={{ padding: 5 }}>Placeholder for ratings and reviews (average: {product.reviewAvg} /10 — {product.reviewCount} reviews)</p>
          </div>
        </div>
        
      </header>
    </div>
  );
}

export default Product;

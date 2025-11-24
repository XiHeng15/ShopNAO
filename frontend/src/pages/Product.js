import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Product.css";

export default function Product() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="ProductPage">
      <div className="ProductBox">
        <img 
          className="ProductImage"
          src={`http://localhost:5000${product.img}`}
          alt={product.message}
        />

        <div className="ProductDetails">
          <h1>{product.message}</h1>
          <h2>${product.price?.toFixed(2)}</h2>

          {product.description && <p>{product.description}</p>}

          <button className="AddToCart">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

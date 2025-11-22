import React, { useState, useEffect } from 'react';
import "./Browse.css"
import ProductCard from "../components/product_card.js"

function Browse() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products") // endpoint on your server
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  
  return(
    <div className="Browse">
      <header className="Browse-header">
        <h1>Browse SHOPNAO</h1>
        <div className="ProductGrid">
          {products.map((product) => (
            <div className="ProductItem" key={product._id}>
              <ProductCard {...product} id={product._id} />
            </div>
          ))}
        </div>
      </header>
    </div>
  
  );
}


export default Browse;

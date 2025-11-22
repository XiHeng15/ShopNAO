import { useState, useEffect } from "react";
import ProductCard from "./product_card"; // existing card
export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from backend
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="products-list">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          id={product._id}
          item_img_url={product.item_img_url}
          message={product.message}
          price={product.price}
          reviewAvg={product.reviewAvg}
          reviewCount={product.reviewCount}
        />
      ))}
    </div>
  );
}

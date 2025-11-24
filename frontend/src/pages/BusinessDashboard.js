import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BusinessDashboard.css";

export default function BusinessDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const backendURL = "http://localhost:5000"; // backend base URL

  // Get JWT from localStorage (set during login)
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch this business's products
    fetch("http://localhost:5000/api/products/business", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        console.log("Fetched products;", data);//added log debugging
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [token, navigate]);

  if (loading) return <p>Loading your products...</p>;

  return (
    <div className="BusinessDashboard">
      <div className= "BusinessDashboardHeader">Your Business Dashboard
        <button onClick={() => navigate("/add-product")} className = "AddProductButton">Add New Product</button>

        <div className="ProductGrid">
            {products.length === 0 && <p>No products yet.</p>}
            {products.map(p => (
            <div key={p._id} className="ProductItem">
                <img src={backendURL + p.img} alt={p.message} className="ProductImage" />
                
                <h3>{p.message}</h3>
                <p>${p.price.toFixed(2)}</p>
            </div>
            ))}
        </div>
      </div>
    </div>
  );

}
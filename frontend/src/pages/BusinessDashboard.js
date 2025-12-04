import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BusinessDashboard.css";

export default function BusinessDashboard() { //dashboard now properly recieves orders
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const navigate = useNavigate();
  const backendURL = "http://localhost:5000"; // backend base URL
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch this business's products
    fetch(`${backendURL}/api/products/business`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched products:", data); // debugging
        setProducts(data);
        setLoadingProducts(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingProducts(false);
      });

    // Fetch orders for this business's products
    fetch(`${backendURL}/api/orders/product-orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched orders:", data); // debugging
        setOrders(data);
        setLoadingOrders(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingOrders(false);
      });
  }, [token, navigate]);

  if (loadingProducts || loadingOrders)
    return <p>Loading your dashboard...</p>;

  return (
    <div className="BusinessDashboard">
      <div className="BusinessDashboardHeader">
        Your Business Dashboard
        <button
          onClick={() => navigate("/add-product")}
          className="AddProductButton"
        >
          Add New Product
        </button>

        {/* Products Section */}
        <section className="ProductsSection">
          <h2>Your Products</h2>
          <div className="ProductGrid">
            {products.length === 0 && <p>No products yet.</p>}
            {products.map((p) => (
              <div key={p._id} className="ProductItem">
                <img
                  src={backendURL + p.img}
                  alt={p.message}
                  className="ProductImage"
                />
                <h3>{p.message}</h3>
                <p>${p.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Orders Section */}
      <section className="OrdersSection">
        <h2>Orders for Your Products</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="OrderList">
            {orders.map((order) => (
              <div key={order._id} className="OrderItem">
                {order.items.map((item, idx) => (
                  <div key={idx}>
                    <p><b>Product:</b> {item.productName}</p>
                    <p><b>Price:</b> ${item.productPrice}</p>
                    <p><b>Quantity:</b> {item.quantity}</p>
                  </div>
                ))}
                <p><b>Buyer ID:</b> {order.userId}</p>
                <p><b>Status:</b> {order.status}</p>
                <p><b>Ordered At:</b> {new Date(order.createdAt).toLocaleString()}</p>
                <p><b>Total Earnings from this order:</b> ${order.totalAmount}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

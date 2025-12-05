import { useEffect, useState } from "react";
import "./OrderDashboard.css";

export default function OrderDashboard() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/orders/my-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, [token]);

  if (!orders) return <p>Loading orders...</p>;

  return (
    <div className="OrderDashboard">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="OrderList">
          {orders.map((order) => (
            <div key={order._id} className="OrderItem">
              {order.items.map((item) => (
                <div key={item.productId?._id} className="OrderProduct">
                  <p><b>Product:</b> {item.productId?.name || "Unknown"}</p>
                  <p><b>Business:</b> {item.productId?.owner?.name || "Unknown"}</p>
                  <p><b>Quantity:</b> {item.quantity}</p>
                  <p><b>Price:</b> ${item.priceAtPurchase.toFixed(2)}</p>
                </div>
              ))}
              <p><b>Total:</b> ${order.amount.toFixed(2)}</p>
              <p><b>Status:</b> {order.status}</p>
              <p><b>Ordered At:</b> {new Date(order.createdAt).toLocaleString()}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

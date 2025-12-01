import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

export default function AddProduct() {
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [stock, setStock] = useState("")
  const navigate = useNavigate();

  // handle file input
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!message || !price || !image || !stock) {
      alert("Please fill in all required fields and select an image.");
      return;
    }

    if (price < 0) { //prevent negative prices
      alert("Price cannot be negative");
      return;
    }

    if (stock < 0) { //prevent negative stock
      alert("Stock cannot be negative");
      return;
    }
      

    const formData = new FormData();
    formData.append("message", message);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("stock", stock);

    try {

      const token = localStorage.getItem("token"); // JWT from login

      const res = await fetch("http://localhost:5000/api/products/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // attach JWT
        },
        body: formData, // multipart/form-data automatically set by browser
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add product");
        return;
      }

      alert("Product added successfully!");
      navigate("/business"); // redirect back to business dashboard
    } catch (err) {
      alert("Server error: " + err.message);
    }
  };

  return (
    <div className="AddProduct">
      <header className="AddProductHeader">
        <div className="AddProductCard">
          <h2>Add New Product</h2>

          <label>Product Name / Message:</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            min="0"          // prevents negative values
            step="0.01"      // allows cents
          />

          <label>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(parseFloat(e.target.value))}
            min="0"          // prevents negative values
            step="1"      // noy allows whole numbers
          />

          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />

          <button onClick={handleSubmit}>Add Product</button>
        </div>
      </header>
    </div>
  );
}

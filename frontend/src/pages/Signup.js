import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("regular"); //added role state for business vs customer
  const navigate = useNavigate();

  async function handleSignup() {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          address: { street, city, zipCode, country },
          role //added role field for business vs customer
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Signup successful! Welcome " + data.name);
      navigate("/login"); // Redirect to login page
    } catch (err) {
      alert("Server error: " + err.message);
    }
  }

  return (
    <div className="Signup">
        <header className="SignupHeader">
            <div className="SignupCard">
            <h2>Create an Account</h2>

            <label>Name:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />

            <label>Email:</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <label>Account Type:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="regular">Regular</option>
            <option value="business">Business</option>
            </select>

            <h3>Address (Optional)</h3>
            <label>Street:</label>
            <input value={street} onChange={(e) => setStreet(e.target.value)} />
            <label>City:</label>
            <input value={city} onChange={(e) => setCity(e.target.value)} />
            <label>Zip Code:</label>
            <input value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
            <label>Country:</label>
            <input value={country} onChange={(e) => setCountry(e.target.value)} />

            <button onClick={handleSignup}>Sign Up</button>
            </div>
        </header>
    </div>
  );
}

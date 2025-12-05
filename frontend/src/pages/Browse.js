import React, { useState, useEffect } from 'react';
import "./Browse.css"
import ProductCard from "../components/product_card.js"
import Select from "react-select";

function Browse() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const allCategories = [ //taken from AddProduct.js
    { value: "Food", label: "Food" },
    { value: "Clothing", label: "Clothing" },
    { value: "Electronics", label: "Electronics" },
    { value: "Beauty", label: "Beauty" },
    { value: "Sports", label: "Sports" },
    { value: "Home", label: "Home" },
    { value: "Books", label: "Books" },
  ];

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

  if (loading) return( 
    <div className="Loading">
      <div className="LoadingBox">
        <p>Loading products!</p>
      </div>
    </div>
  );

  // Client-side filter for quick search (case-insensitive)
  const term = search.trim().toLowerCase();
  const filtered = products.filter((p) => {
    // Text search
    const text = ((p.message || p.name) || "").toString().toLowerCase();
    const matchesSearch = !term || text.includes(term);

    // Category filter (added based off of our categories in AddProduct.js)
    const matchesCategory =
      selectedCategories.length === 0 ||
      p.categories.some((cat) => selectedCategories.includes(cat));


    return matchesSearch && matchesCategory;
  });

  return(
    <div className="Browse">
      <header className="Browse-header">
        <h1>Browse SHOPNAO</h1>

        <div className="SearchBar">
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search products"
          />


          {/* Added a new Category filter dropdown */}
          <Select
            options={allCategories}
            isMulti
            placeholder="Filter categories..."
            onChange={(selected) =>
              setSelectedCategories(selected.map((s) => s.value))
            }
            styles={{
              menu: (base) => ({
                ...base,
                color: "black",
              }),
            }}
          />

        </div>



        <div className="ProductGrid">
            {filtered.length === 0 ? (
              search === "" ? (
                <p>No products found.</p>
              ) : (
                <p>No products found for "{search}"</p>
              )
            ) : (
            filtered.map((product) => (
              <div className="ProductItem" key={product._id}>
                <ProductCard {...product} id={product._id} />
              </div>
            ))
          )}
        </div>
      </header>
    </div>
  );
}


export default Browse;

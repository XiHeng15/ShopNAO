import React from 'react';
import "./Browse.css"
import "../components/product_card"
import FullProductCard from '../components/product_card';

function Browse() {
  return(
    <div className="Browse">
      <header className="Browse-header">
        <h1>Browse SHOPNAO</h1>
        <div><FullProductCard/></div>
      </header>
    </div>
  
  );
}



export default Browse;

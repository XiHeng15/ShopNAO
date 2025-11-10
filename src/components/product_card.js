import "./product_card.css";
import { useState } from "react";

//product-card component that shows a product (product info, image, price)
export default function ProductCard({ item_img_url, message, price }) {
  const [count, setCount] = useState(1); //tracks the item quantity

  return (
    /* displays what is shown on the product screen */
    <div className="Card"> 
      <h1>{message}</h1>
      <Item item_img_url={item_img_url} />
      <h3>${price * count}</h3>
      <p>Quantity: {count}</p>
      <Counter count={count} setCount={setCount} />
      <Button />
    </div> 
  ); 
}

//Runs when someone presses the "Add to cart" button 
function handleClick() {
  alert("Item(s) are NAO purchased :D"); //temporary alert msg when clicked
}

//Button to add item(s) to the cart
function Button() {
  return (
    <div>
      <button onClick={handleClick}> Add to cart NAO </button> 
    </div>
  );
}

//product image
function Item({ item_img_url }) {
  return <img src={item_img_url} alt="" />;
}

//Product quantity counter based on + or - button clicks
function Counter({ count, setCount }) {
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => count > 5 && setCount(count - 1)}>-</button>
    </div>
  );
}
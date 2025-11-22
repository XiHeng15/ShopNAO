import "./product_card.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//product-card component that shows a product (product info, image, price, review average, review count)
export default function ProductCard({ id, item_img_url, message, price, reviewAvg, reviewCount }) {
  const [count, setCount] = useState(1); //tracks the item quantity
  const navigate = useNavigate();

  return (
    /* displays what is shown on the product screen */
    <div className="Card" onClick={() => id && navigate(`/product/${id}`)}>
      <h1>{message}</h1>
      <Item item_img_url={item_img_url} />
      <h3>${price * count}</h3>
      <p>Quantity: {count}</p>
      <Counter count={count} setCount={setCount} />
      <h3>
        Rated {reviewAvg} /10 by {reviewCount} verified customers!
      </h3>
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
      <button onClick={(e) => { e.stopPropagation(); handleClick(); }}> Add to cart NAO </button> 
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
      <button onClick={() => count > 1 && setCount(count - 1)}>-</button>
    </div>
  );
}
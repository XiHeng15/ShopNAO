import "./product_card.css";
import { useState } from "react";

export default function ProductCard({ item_img_url, message, price }) {
  const [count, setCount] = useState(1);

  return (
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

function handleClick() {
  alert("Item(s) are NAO purchased :D");
}

function Button() {
  return (
    <div>
      <button onClick={handleClick}> Add to cart NAO </button>
    </div>
  );
}

function Item({ item_img_url }) {
  return <img src={item_img_url} alt="" />;
}

function Counter({ count, setCount }) {
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => count > 1 && setCount(count - 1)}>-</button>
    </div>
  );
}
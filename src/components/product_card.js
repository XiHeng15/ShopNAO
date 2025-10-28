import "./product_card.css";
import { useState } from "react";

export default function FullProductCard() {
  const item_img_url =
    "data:image/jpeg;base64,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";

  return (
    <ProductCard
      message={"HAMMER GRAHHAHAHAHAAA >:D"}
      item_img_url={item_img_url}
      price={13}
    />
  );
}

function ProductCard({ item_img_url, message, price }) {
  const [count, setCount] = useState(1);

  return (
    <div className="App">
      <h1>{message}</h1>
      <Item item_img_url={item_img_url} />
      <h3>${price * count}</h3>
      <p>Count: {count}</p>
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
      <button onClick={handleClick}> Buy NAO </button>
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
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
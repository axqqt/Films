import { createRef, useState, useContext } from "react";

import { UserData } from "../App";
import Axios from "axios";
import ViewExisting from "./ViewExisting";
// import WhatPage from "./Test";

const Cart = () => {
  const datax = useContext(UserData);
  const { status, setStatus, loading, setLoading, RingLoader } = datax;

  const [cart, setCart] = useState({
    item: "",
    description: "",
    quantity: 5,
    image: "",
  });

  const [item, setItem] = useState([]);

  // type Actions = {
  //   type: "add",
  //   payload: String,
  // };

  // function CountReducer(state, action) {}

  // const [state, dispatch] = useReducer(CountReducer, []);

  const handleChange = (e) => {
    setCart({ ...cart, [e.target.name]: e.target.value });
  };
  const nameRef = createRef();
  const descRef = createRef();
  const quanRef = createRef();

  const AddItem = async (e) => {
    e.preventDefault();
    try {
      setStatus("");
      setLoading(true);
      const response = await Axios.post("http://localhost:8000/cart", cart);

      if (response.status === 201) {
        setStatus(`Item ${cart.item} created`);
        const timeTillReload = setTimeout(() => {
          window.location.reload();
        }, 1500);
        timeTillReload();
      } else if (response.status === 400) {
        setStatus("Bad Request");
      }
    } catch (err) {
      console.error(err);
      setStatus(err.response.data.Alert);
    } finally {
      localStorage.setItem("cart", cart);
      setLoading(false);
      nameRef.current.value = "";
      descRef.current.value = "";
      quanRef.current.value = 5;
    }
  };

  return (
    <div style={{ margin: "2%", justifyContent: "space-evenly 2px" }}>
      <h1>Add to Cart</h1>
      <form onSubmit={AddItem}>
        <input
          name="item"
          onChange={handleChange}
          placeholder="Enter Item Name..."
          value={cart.item}
          ref={nameRef}
        />
        <input
          name="description"
          onChange={handleChange}
          placeholder="Enter Item Description..."
          value={cart.description}
          ref={descRef}
        />
        <input
          name="image"
          onChange={handleChange}
          placeholder="Enter image..."
          defaultValue={cart.image}
        />
        <input
          name="quantity"
          onChange={handleChange}
          placeholder="Enter Quantity..."
          type="number"
          defaultValue={cart.quantity}
          ref={quanRef}
        />
        <button type="submit">
          {loading ? <RingLoader></RingLoader> : "Add to Cart"}
        </button>
      </form>
      <p>{status}</p>
      <br></br>
      <ViewExisting item={item} setItem={setItem} />
    </div>
  );
};

export default Cart;

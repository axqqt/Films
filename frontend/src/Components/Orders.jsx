/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Axios from "axios";
const Orders = () => {
  const [data, setData] = useState([]);

  async function PlaceOrder(e, id) {
    e.preventDefault();
    try {
      const r = await Axios.post(`http://localhost:8000/cart/${id}`);
      setData(r.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect((e) => {
    alert("This page is work in progress!");
  }, []);

  return <div>Orders</div>;
};

export default Orders;

/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UserData } from "../App";
import ItemsPage from "./Items";

const ViewExisting = (props) => {
  // const { item, setItem } = props;
  const datax = useContext(UserData);
  const { status, setStatus, loading, setLoading, data, setData, RingLoader } =
    datax;
  // const count = useSelector((state) => state.price);
  // const dispatch = useDispatch();

  const getItems = async () => {
    try {
      setLoading(true);
      const r = await Axios.get("http://localhost:8000/cart");
      setData(r.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const Order = async (id) => {
    try {
      setLoading(true);
      const r = await Axios.post(`http://localhost:8000/cart/${id}`);
      if (r.status === 201) {
        setStatus("Order Placed");
      }
    } catch (err) {
      console.error(err);
      setStatus(err.response.data.Alert);
    } finally {
      setLoading(false);
    }
  };

  const Delete = async (id) => {
    try {
      setLoading(true);
      const r = await Axios.delete(`http://localhost:8000/cart/${id}`);
      console.log(r.data);
      if (r.status === 200) {
        setStatus("Deleted!");
      }
    } catch (err) {
      console.error(err);
      setStatus(err.response.data.Alert);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      {/* <h2>{count}</h2>
      <button
        className="place-items-center"
        onClick={() => {
          dispatch({ type: "INCREMENT", payload: 200 });
        }}
      >
        Increase
      </button> */}
      <h1 style={{ textAlign: "center" }}>Manage Shop</h1>
      <div>
        {loading ? (
          <RingLoader></RingLoader>
        ) : (
          <div>
            {data && data.length ? (
              data.map((x) => (
                <div key={x._id} style={{ margin: "2%", padding: "2%" }}>
                  <ItemsPage data={x}></ItemsPage>
                  <button
                    onClick={() => {
                      Order(x._id);
                    }}
                  >
                    Order
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      Delete(x._id);
                    }}
                  >
                    Delete
                  </button>
                  <p>{status}</p>
                </div>
              ))
            ) : (
              <h1>No items exist</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewExisting;

/* eslint-disable no-unused-vars */
import { UserData } from "../App";
import { useContext, useRef, useState } from "react";
import Axios from "axios";
import RingLoader from "react-spinners/RingLoader";

const GenerateImages = () => {
  const datax = useContext(UserData);

  const { loading, setLoading, status, setStatus } = datax;

  const [generated, setGenerated] = useState([]);
  const [data, setData] = useState({
    image: "",
    quantity: 1,
    resolution: "1024x1024", //defaults!
  });
  const imgRef = useRef();
  const quanRef = useRef();
  const resRef = useRef();

  const generateImage = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.post("http://localhost:8000/images", data);
      setStatus(response.data.Alert);
      setGenerated(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setData({
        image: "",
        quantity: 1,
        resolution: "1024x1024", //defaults!
      });
      imgRef.current.value = "";
      quanRef.current.value = "";
      resRef.current.value = "";
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Generate Images!</h1>
      <form onSubmit={generateImage}>
        <input
          onChange={handleChange}
          name="image"
          placeholder="Enter image to generate!"
          ref={imgRef}
          type="text"
        />
        <div>
          <input
            onChange={handleChange}
            name="quantity"
            type="number"
            ref={quanRef}
            placeholder="Enter Quantity"
            value={data.quantity}
          />
        </div>
        <input
          onChange={handleChange}
          name="resolution"
          placeholder="Enter resolution"
          type="text"
          ref={resRef}
          value={data.resolution}
        />
        <button type="submit" disabled={loading}>
          {loading ? <RingLoader /> : "Generate Image!"}
        </button>
      </form>
      {generated && generated.length ? (
        generated.map((x, index) => (
          <div key={x.id || index}>
            <img src={x.image_url} alt={`Image of ${data.image}`} />
          </div>
        ))
      ) : (
        <div>{status}</div>
      )}
    </div>
  );
};

export default GenerateImages;

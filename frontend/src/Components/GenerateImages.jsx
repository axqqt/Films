/* eslint-disable no-unused-vars */
import { UserData } from "../App";
import { useContext, useReducer, useRef, useState } from "react";
import Axios from "axios";
import RingLoader from "react-spinners/RingLoader";
import DefaultLogin from "./DefaultLogin";

const GenerateImages = () => { 

  //api key is not valid which is why this is not working properly!
  const { loading, setLoading, status, setStatus,logged , user,BASE} = useContext(UserData);


  const [generated, setGenerated] = useState([]);
  const [data, setData] = useState({
    image: "",
    quantity: 1,
    resolution: "1024x1024", //defaults!
  });
  const imgRef = useRef();
  const quanRef = useRef();
  const resRef = useRef();

  let counter = 0;

  const generateImage = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response  = await Axios.post(`${BASE}/images`, {image:data});
      setStatus(response.data.Alert);
      setGenerated(response.data);
      if(response.data.status===200){
        counter++;
      }
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

  return logged && user ? (
    <div>
      <h1>Generate Images!</h1>
      <form onSubmit={generateImage}>
        <input
          onChange={handleChange}
          name="image"
          placeholder="Enter image to generate!"
          ref={imgRef}
          type="text"
          required
        />
        <div>
          <input
            onChange={handleChange}
            name="quantity"
            type="number"
            ref={quanRef}
            placeholder="Enter Quantity"
            value={data.quantity}
            min={1}
            required
          />
        </div>
        <input
          onChange={handleChange}
          name="resolution"
          placeholder="Enter resolution"
          type="text"
          ref={resRef}
          value={data.resolution}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? <RingLoader /> : "Generate Image!"}
        </button>
      </form>   
      <h1>{counter===0 ? "Let me know what u want to Generate 🎨" : "Anything else in mind?"}</h1>
      {generated && generated.length && !loading ? (
        generated.map((x, index) => (
          <div key={x.id || index}>
            <img src={x.image_url} alt={`Image of ${data.image}`} height={500}/>
          </div>
        ))
      ) : (
        <div>{status}</div>
      )}
    </div>
  ) : <DefaultLogin/>;
};

export default GenerateImages;

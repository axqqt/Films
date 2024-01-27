// import Axios from "axios";
import { useState } from "react";
import { UploadImage } from "./Services/Api";

const Scanned = () => {
  const [image, setImage] = useState();
  const [data, setData] = useState([]);

  async function ScanImage(e) {
    e.preventDefault();
    try {
      const scanned = await UploadImage(image);
      setData(scanned);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Image Scanner!</h1>
      <form onSubmit={ScanImage}>
        <input
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          type="file"
        ></input>
        <button type="submit">Submit!</button>
      </form>
      {data.map((x, index) => (
        <div key={x.id || index}>
          <img src={x.images.url[0]} alt={"Requested Image"}></img>
        </div>
      ))}
    </div>
  );
};

export default Scanned;

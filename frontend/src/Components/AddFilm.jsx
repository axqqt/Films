import { useState, useContext } from "react";
import { UserData } from "../App";
import Axios from "axios";
import { Link } from "react-router-dom";

const AddFilm = () => {
  const datax = useContext(UserData);

  const { status, setStatus, loading, setLoading, RingLoader } = datax;

  const [data, setData] = useState({
    title: "",
    description: "",
    trailer: "",
    photo: null,
    alternate: "",
    rating: "",
  });

  const handleChange = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setData({ ...data, photo: e.target.files[0] });
  };

  const resetForm = () => {
    setData({
      title: "",
      description: "",
      trailer: "",
      photo: null,
      alternate: "",
      rating: "",
    });
  };

  async function createFilm(e) {
    e.preventDefault();
    try {
      setLoading(true);

      const list = new FormData();
      list.append("title", data.title);
      list.append("description", data.description);
      list.append("trailer", data.trailer);
      list.append("photo", data.photo);
      list.append("alternate", data.alternate);
      list.append("rating", data.rating);

      const response = await Axios.post(
        "http://localhost:8000/home",
        { list },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        setStatus(`${data.title} Added`);
      }
    } catch (err) {
      console.error(err);
      setStatus(`Error adding film: ${err.message}`);
    } finally {
      setLoading(false);
      resetForm();
    }
  }

  return (
    <>
      <h1 style={{ fontSize: 32 }}>Add Film</h1>

      <form onSubmit={createFilm}>
        <input
          value={data.title}
          onChange={handleChange}
          placeholder="Enter Title"
          name="title"
        />
        <input
          value={data.description}
          onChange={handleChange}
          name="description"
          placeholder="Write your description"
        />
        <input
          value={data.trailer}
          onChange={handleChange}
          placeholder="Enter trailer"
          name="trailer"
        />
        <input
          value={data.alternate}
          onChange={handleChange}
          placeholder="Enter alternate image by address"
          name="alternate"
        />
        <input onChange={handleFileChange} type="file" />
        <input
          value={data.rating}
          onChange={handleChange}
          type="number"
          name="rating"
          placeholder="Enter rating"
        />
        <button type="submit" disabled={loading}>
          {loading ? <RingLoader></RingLoader> : "Add Film"}
        </button>
        <h1>{status}</h1>
      </form>
      <Link to="/">Go to Movies</Link>
    </>
  );
};

export default AddFilm;

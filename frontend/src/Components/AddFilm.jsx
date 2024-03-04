/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { UserData } from "../App";
import Axios from "axios";
import { Link } from "react-router-dom";

const AddFilm = () => {
  const { status, setStatus, loading, setLoading, RingLoader, logged } =
    useContext(UserData);

  const [data, setData] = useState({
    title: "",
    description: "",
    trailer: "",
    image: null,
    alternate: "",
    rating: 0,
    category: "",
  });

  const handleChange = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setData({ ...data, image: e.target.files[0] });
  };

  const resetForm = () => {
    setData({
      title: "",
      description: "",
      trailer: "",
      image: null,
      alternate: "",
      rating: 0,
      category: "",
    });
  };

  const createFilm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("trailer", data.trailer);
      formData.append("alternate", data.alternate);
      formData.append("rating", data.rating);
      formData.append("category", data.category);
      if (data.image) {
        // Check if a file is selected
        formData.append("image", data.image);
      }

      const response = await Axios.post(
        "http://localhost:8000/home" || "https://films-backend.vercel.app/home",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        setStatus(`${data.title} Added`);
      }
    } catch (err) {
      console.error(err);
      if (err.data.status === 400) {
        setStatus(`Error while adding , seems to be already added?`);
      }
    } finally {
      setLoading(false);
      resetForm();
    }
  };

  return (
    <>
      <h1 style={{ fontSize: 32, display: "flex" }}>Add Film</h1>
      <form onSubmit={createFilm}>
        <input
          value={data.title}
          onChange={handleChange}
          placeholder="Enter Title"
          name="title"
          required
        />
        <input
          value={data.description}
          onChange={handleChange}
          name="description"
          placeholder="Write your description"
          required
        />
        <input
          value={data.trailer}
          onChange={handleChange}
          placeholder="Enter trailer"
          name="trailer"
          required
        />
        <input
          value={data.alternate}
          onChange={handleChange}
          placeholder="Enter alternate image by address"
          name="alternate"
        />
        <input onChange={handleFileChange} type="file" name="image" />
        <span>
          <p>Rating...</p>
          <input
            value={data.rating}
            onChange={handleChange}
            type="number"
            name="rating"
            min={1}
            max={10}
            placeholder="Enter rating"
          />
        </span>
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

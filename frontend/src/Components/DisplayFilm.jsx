/* eslint-disable react/prop-types */

import Axios from "axios";
import { useContext, useEffect } from "react";
import { UserData } from "../App";

const DisplayFilm = ({ x }) => {
  const { loading, setLoading } = useContext(UserData);

  useEffect(() => {
    setLoading(false); // Make sure to set loading to false when component mounts
  }, [setLoading]);

  async function updateRating(id, newRating) {
    try {
      setLoading(true);
      const updatedRating = await Axios.put(
        `http://localhost:8000/home/${id}`,
        { rating: newRating }
      );
      if (updatedRating.status === 200) {
        alert("Updated Likes!");
      }
      navigator("/")
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return loading ? (
    "Loading..."
  ) : (
    <div key={x._id}>
      <h1 className="text-2xl font-bold">{x.title}</h1>
      <img
        src={x.alternate || x.photo || "No image available"}
        height={500}
        alt={`Image of ${x.title}`}
        className="mt-2 rounded-md"
      />
      <br></br>
      {x.photo ? <img src={x.photo} alt={`Image of ${x.title}`} /> : ""}
      <div>
        <p>{x.rating ? `Rated ${x.rating}/10` : <h1>Unrated!</h1>}</p>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          const newRating = x.rating + 1; // Change this logic if necessary
          updateRating(x._id, newRating);
        }}
      >
        👍🏻
      </button>
    </div>
  );
};

export default DisplayFilm;

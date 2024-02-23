/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import Axios from "axios";
import { Suspense, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../App";

const DisplayFilm = ({ x }) => {
  const navigator = useNavigate();
  const { loading, setLoading } = useContext(UserData);

  useEffect(() => {
    setLoading(false); // Make sure to set loading to false when component mounts
  }, [setLoading]);



  async function updateRating(id) {
    try {
      setLoading(true);
      const updatedRating = await Axios.patch(
        `http://localhost:8000/home/${id}`,
      );
      if (updatedRating.status === 200) {
        alert("Updated Likes!");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return <Suspense fallback={"Loading..."}> <div key={x._id} style={{margin:"5%",padding:"5%"}}>
  <h1 className="text-2xl font-bold">{x.title.toUpperCase()}</h1>
  <img
    src={x?.alternate? x.alternate : ""}
    height={500}
    className="mt-2 rounded-md"
  />
  <br></br>
  {x.photo ? <img src={x.photo}   /> : ""}
  <div>
    <p>{x.rating ? `Rated ${x.rating}/10` : <h1>Unrated!</h1>}</p>
  </div>
  <button
    onClick={(e) => {
      e.preventDefault();
      updateRating(x._id);
    }}
  >
    👍🏻
  </button>
</div></Suspense>
};

export default DisplayFilm;

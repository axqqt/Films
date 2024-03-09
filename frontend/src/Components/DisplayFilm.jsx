/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import Axios from "axios";
import { Suspense, useContext, useEffect, useState } from "react";
import { UserData } from "../App";

const DisplayFilm = ({ x }) => {
  const { loading, setLoading } = useContext(UserData);

  async function updateRating(id) {
    try {
      setLoading(true);
      const output = await Axios.patch(
        `http://localhost:8000/home/${id}` ||
          `https://films-backend.vercel.app/home/${id}`
      );

      if (output.data.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function DownVote(id) {
    try {
      setLoading(true);
      const output = await Axios.put(
        `http://localhost:8000/home/downvote/${id}` ||
          `https://films-backend.vercel.app/home/downvote/${id}`
      );

      if (output.data.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Suspense fallback={loading}>
      <div key={x._id} style={{ margin: "5%", paddingBottom: "5%" }}>
        <h1 className="text-2xl font-bold">{x.title}</h1>
        <img
          style={{ width: "fit" }}
          src={x?.alternate ? x.alternate : ""}
          height={500}
          className="mt-2 rounded-md"
        />
        <br></br>
        {x.comments && x.comments.length
          ? x.comments.map((comment, index) => (
              <p key={index}>{` ${index}.${comment}`}</p>
            ))
          : "No comments found"}
        {x.photo ? <img height={500} src={x.photo} /> : ""}
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
        <button
          onClick={(e) => {
            e.preventDefault();
            DownVote(x._id);
            {
              /**Downvoting feature */
            }
          }}
        >
          👎🏻
        </button>
      </div>
    </Suspense>
  );
};

export default DisplayFilm;

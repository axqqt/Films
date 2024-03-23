/* eslint-disable no-unused-vars */
import { Suspense, useContext, useEffect, useState } from "react";
import Axios from "axios";
import { UserData } from "../App";
import DefaultLogin from "./DefaultLogin";
import { Link } from "react-router-dom";

const YouTube = () => {
  const { user, logged, loading, setLoading, status, setStatus, BASE } =
    useContext(UserData);
  const URL = `${BASE}/tube`;
  const [data, setData] = useState([]);
  const [prompt, setPrompt] = useState("");

  let searched = 0;

  const searchByTitle = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.post(URL, { thePrompt: prompt });
      if (response.data.status === 200) {
        setData(response.data);
        searched++;
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 404) {
        setStatus("No results found!");
      }
    } finally {
      setLoading(false);
    }
  };

  return user && logged ? (
    <Suspense fallback={loading}>
      <div>
        <h1>Access YouTube</h1>
        <form onSubmit={searchByTitle}>
          <input
            type="text"
            placeholder="What's on your mind..."
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            Search...
          </button>
        </form>
        <div
          style={{
            padding: "5%",
            display: "flex",
            flexDirection: "column",
            gap: "40px",
          }}
        >
          {data && data.length
            ? data.map((video, index) => (
                <div
                  key={video.id || index}
                  style={{
                    marginBottom: "20px",
                    padding: "20px",
                    border: "10px solid purple",
                    borderRadius: "5px",
                  }}
                >
                  <h2>{video.title}</h2>
                  <p>{video.description}</p>
                  <p>{video.views ? `${Math.round(video.views)} Views` : ""}</p>
                  <p>{video.uploaded}</p>
                  <p>
                    {video.durationString
                      ? `${Math.round(video.durationString)} Minutes Long!`
                      : ""}
                  </p>
                  <img src={video.thumbnail} alt={video.title} height={500} />
                  <p>
                    <a
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`Click here to watch -> ${video.title}`}
                    </a>
                  </p>
                </div>
              ))
            : searched === 0
            ? "Browse YouTube... 🍿"
            : "No results found!"}
        </div>
        <p>{status}</p>
        <p>{searched === 0 ? "" : "Anything else?"}</p>
      </div>
    </Suspense>
  ) : (
    <DefaultLogin />
  );
};

export default YouTube;

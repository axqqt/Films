/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { UserData } from "../App";
import DefaultLogin from "./DefaultLogin";
import { Link } from "react-router-dom";

const YouTube = () => {
  const Base =
    "http://localhost:8000/tube" || "https://films-backend.vercel.app/tube";
  const { user, logged, loading, setLoading } = useContext(UserData);
  const [data, setData] = useState([]);
  const [prompt, setPrompt] = useState("");

  let searched = 0;

  async function searchByTitle(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await Axios.post(Base, prompt);
      console.log(data);
      setData(data.videos);
      searched++;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return user && logged && !loading ? (
    <div>
      <h1>Access YouTube</h1>
      <form onSubmit={searchByTitle}>
        <input
          type="text"
          placeholder="What's on your mind..."
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Search...
        </button>
      </form>
      <div>
        {data && data.length ? (
          data.map((video) => (
            <div key={video.id}>
              <h1>{video.title}</h1>
              <p>Description: {video.description}</p>
              <p>Views: {video.views}</p>
              <p>Uploaded: {video.uploaded}</p>
              <p>Duration: {video.durationString}</p>
              <img src={video.thumbnail} alt={video.title} height={200} />
              <p>
                Channel:
                <a href={video.channel.link} target="_blank" rel="noopener noreferrer">
                  {video.channel.name}
                </a>
              </p>
            </div>
          ))
        ) : (
          <p>No results found!</p>
        )}
      </div>
      <p>{searched === 0 ? "" : "Anything else?"}</p>
    </div>
  ) : (
    <DefaultLogin />
  );
};

export default YouTube;

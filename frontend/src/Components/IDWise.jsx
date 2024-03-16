/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { UserData } from "../App";
import DefaultLogin from "./DefaultLogin";

const API_URL = "https://films-backend.vercel.app/home";

const IDWisePage = () => {
  const { status, setStatus, RingLoader,logged } = useContext(UserData);
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  const { id: urlId } = useParams();

  const handleSearchID = async () => {
    try {
      const {data} = await Axios.post(`${API_URL}/${urlId}`);
      setMovie(data);
      setStatus(data.Alert);
    } catch (error) {
      console.error("Error searching:", error);
      setStatus("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  useEffect(() => {
    handleSearchID();
  }, []);

  return logged? (
    <div style={{ margin: "5%" }}>
      {loading ? (
        <RingLoader/>
      ) : movie && Object.keys(movie).length ? (
        <div>
          <h1>{movie.title}</h1>
          <img
            src={movie.photo || movie.alternate}
            alt={`Image of ${movie.title}`}
            height={400}
          ></img>
          <br></br>
          <p>{movie.description}</p>
          <br></br>
          <a href={movie.trailer}>
            {movie.trailer ? `Trailer for ${movie.title}` : ""}
          </a>
          <p>Added on {formatDate(movie.createdAt)}</p>
        </div>
      ) : (
        <p>No results found</p>
      )}
      <p>{status}</p>
    </div>
  ):<DefaultLogin/>;
};

export default IDWisePage;

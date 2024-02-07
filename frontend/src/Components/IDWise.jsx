import { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { UserData } from "../App";

const API_URL = "http://localhost:8000";

const IDWisePage = () => {
  const { status, setStatus, RingLoader } = useContext(UserData);
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  const { id: urlId } = useParams();

  const handleSearchID = async () => {
    try {
      const response = await Axios.post(`${API_URL}/home/${urlId}`);
      setMovie(response.data);
      setStatus(response.data.Alert);
    } catch (error) {
      console.error("Error searching:", error);
      setStatus(error.response?.data?.Alert || "An error occurred");
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

  return (
    <div style={{ margin: "5%" }}>
      {loading ? (
        <RingLoader></RingLoader>
      ) : movie && Object.keys(movie).length ? (
        <div>
          <h1>{movie.title}</h1>
          <img
            src={movie.photo || movie.alternate}
            alt={`Image of ${movie.title}`}
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
  );
};

export default IDWisePage;

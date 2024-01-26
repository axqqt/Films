/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { UserData } from "../App";
import Axios from "axios";

const YTSPage = () => {
  const datax = useContext(UserData);

  const { movies, setMovies, loading, setLoading, RingLoader } = datax;
  const [movie, setMovie] = useState("");
  const [qual, setQual] = useState("All");

  const handleChange = (e) => {
    setQual({ ...qual, [e.target.name]: e.target.value });
  };

  async function fetchFilms() {
    try {
      setLoading(true);
      const yts = await Axios.get("https://yts.mx/api/v2/list_movies.json");
      setMovies(yts.data.data.movies);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchFilmsSearch(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const yts = await Axios.get(
        `https://yts.mx/api/v2/list_movies.json?query_term=${movie}&quality=${qual}`
      );
      setMovies(yts.data.data.movies);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFilms();
  }, []);

  return (
    <div>
      <h1>YTS Page!</h1>
      <form onSubmit={fetchFilmsSearch}>
        <input
          onChange={(e) => {
            setMovie(e.target.value);
          }}
          placeholder="Search for a film"
        />
        <label>Choose a car:</label>
        <select>
          <option value="480p" onChange={handleChange}>
            480p
          </option>
          <option value="720p" onChange={handleChange}>
            720p
          </option>
          <option value="1080p" onChange={handleChange}>
            1080p
          </option>
          <option value="2160p" onChange={handleChange}>
            2160p
          </option>
        </select>
        <button type="submit" disabled={loading}>
          Search for film!
        </button>
      </form>

      {loading ? (
        <RingLoader />
      ) : movies && movies.length ? (
        <div style={{ color: "black" }}>
          {movies.map((x) => (
            <div key={x.id} style={{ padding: "5%" }}>
              <h1>{x.title}</h1>
              <img src={x.large_cover_image} alt={`Image of ${x.title}`} />
              <img
                src={x.background_image_original}
                alt={`Background image of ${x.title}`}
              />
              <p>{x.description_full || ""}</p>
              <p>{x.rating ? `Rated ${x.rating}/10` : ""}</p>
              <p>{x.year ? `Released in ${x.year}` : ""}</p>
              <h2>
                {x.runtime
                  ? `Runtime is ${Math.abs(x.runtime / 60)} hours`
                  : ""}
              </h2>
              <p>{x.mpa_rating ? `Rating ${x.mpa_rating}` : ""}</p>
              <p>{x.language}</p>
              <h2>{x.date_uploaded ? `Uploaded on ${x.date_uploaded}` : ""}</h2>
              {x.url && (
                <a href={x.url}>
                  <h1> Click here to view {x.title}</h1>
                </a>
              )}
              {/* <h2>
                <a href={x.torrents?.url[0]}>
                  {x.torrents ? x.torrents.url[0] : ""}
                </a>
              </h2> */}
            </div>
          ))}
        </div>
      ) : (
        <h1>No films found!</h1>
      )}
    </div>
  );
};

export default YTSPage;

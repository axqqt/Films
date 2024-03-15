/* eslint-disable no-fallthrough */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import {
  useEffect,
  useState,
  useContext,
  Suspense,
  useReducer,
  useCallback,
} from "react";
import { UserData } from "../App";
import Axios from "axios";
import { Link } from "react-router-dom";
import DisplayFilm from "./DisplayFilm";
import BotPage from "./Bot";
import { Container, Typography, Button, TextField } from "@mui/material";
import { AddComments, DeleteFilm, EditTitle, GetMain } from "./Services/Api";
import { Slide } from "react-slideshow-image";

const API_URL = "http://localhost:8000" || "https://films-backend.vercel.app";

function Movies() {
  const {
    logged,
    user,
    loading,
    setLoading,
    setStatus,
    status,
    favs,
    setFavs,
  } = useContext(UserData);
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [search, setSearchTerm] = useState("");
  const [modifiedTitle, setModifiedTitle] = useState("");
  const [time, setTime] = useState("");
  const [showBot, setShowBot] = useState(false);

  async function fetchFromBack() {
    try {
      setLoading(true);

      const response = await GetMain();
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFromBack();
  }, []);

  async function deleteFilm(id) {
    try {
      setLoading(true);
      await DeleteFilm(id);
      setData((prevData) => prevData.filter((film) => film._id !== id));
    } catch (error) {
      console.error("Error deleting film:", error);
    } finally {
      setLoading(false);
    }
  }

  async function addComment(id, msg) {
    try {
      setLoading(true);
      await AddComments(id, msg);
      setData((prevData) => {
        const newData = prevData.map((film) => {
          if (film._id === id) {
            return {
              ...film,
              comments: [...film.comments, { id: id, message: msg }],
            };
          }
          return film;
        });
        return newData;
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function editTitle(id, modifiedTitle) {
    try {
      setLoading(true);
      const response = await EditTitle(id, modifiedTitle);
      if (response.data.status === 200) {
        window.location.reload();
      }

      setData((prevData) => {
        return prevData.map((film) => {
          if (film._id === id) {
            return { ...film, title: modifiedTitle };
          }
          return film;
        });
      });
    } catch (error) {
      console.error("Error editing title:", error);
      if (error.response.status === 400) {
        setStatus("Error editing title");
      }
    } finally {
      setLoading(false);
      setModifiedTitle("");
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search.trim()) {
      console.error("Search term is empty");
      return;
    }

    try {
      setLoading(true);
      const response = await Axios.post(`${API_URL}/home/search`, {
        searchTerm: search,
      });
      if (response.status === 200) {
        setData([]);
        setData(response.data);
      }
    } catch (error) {
      console.error("Error searching:", error);
      if (error.response.status === 400) {
        setStatus("You haven't searched for anything!");
      } else if (error.response.status === 404) {
        setStatus("No results found!");
      } else {
        setStatus("Error!");
      }
    } finally {
      setLoading(false);
      if (search === "") {
        fetchFromBack();
      }
    }
  };

  const today = new Date();
  const hours = today.getHours();

  useEffect(() => {
    if (hours < 12) {
      setTime("Good Morning!");
    } else if (hours < 17) {
      setTime("Good Afternoon!");
    } else if (hours < 20) {
      setTime("Good Evening!");
    } else {
      setTime("What are you doing up late? :)");
    }
  }, [hours]);

  const viewBot = (e) => {
    e.preventDefault();
    setShowBot(!showBot);
  };

  const myFavorites = async (filmData) => {
    const history = localStorage.getItem("favs");
    if (history) {
      const parsedData = await JSON.parse(history);
      alert("loaded back your favorites!");
      setFavs([...favs, parsedData]);
    }
    if (user) {
      setFavs([...favs, filmData]);
      localStorage.setItem("favs", favs);
      setStatus(`Added ${filmData}`);
    } else {
      alert("You are not logged in!");
    }
  };

  const userProfileStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "20%",
    objectFit: "cover",
    border: "2px solid #fff",
  };

  return (
    <>
      {!logged ? (
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <div sx={{ textAlign: "center" }}>
            <Typography variant="h3" fontWeight="bold" mb={4}>
              Welcome to VeloFlix! 🍿
            </Typography>
            <Typography variant="body1" mb={4}>
              Explore a world of movies and trailers. Join VeloFlix for a
              personalized experience.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
              sx={{ mr: 2 }}
            >
              Login
            </Button>
            <Typography variant="body1" mt={4}>
              Dont have an account?
              <Link
                to="/newuser"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                Register here
              </Link>
            </Typography>
          </div>
        </Container>
      ) : (
        <>
          <Suspense fallback={loading}>
            <Button
              variant="contained"
              color="primary"
              onClick={viewBot}
              sx={{ mb: 2 }}
            >
              {showBot ? "Close!" : "Show Bot 🤖"}
            </Button>
            {showBot && <BotPage />}
            <Container maxWidth="md" sx={{ mx: "auto", p: 4 }}>
              {user?.photoURL ||
                (user.photo && (
                  <img
                    src={user.photoURL || user.photo}
                    alt="User"
                    style={userProfileStyle}
                  />
                ))}
              <Typography variant="h4" fontWeight="bold" mb={4}>
                {logged
                  ? `Welcome back ${user.displayName || user.username}`
                  : `Welcome Guest`}
                ! , {time}
              </Typography>
              <form
                onSubmit={handleSearch}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <TextField
                  type="text"
                  placeholder="Search Here..."
                  value={search}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  variant="outlined"
                  fullWidth
                  sx={{ mr: 2 }}
                />
                <Button
                  type="submit"
                  disabled={loading}
                  variant="contained"
                  color="primary"
                >
                  Search
                </Button>
              </form>
              {data && data.length ? (
                data.map((x) => (
                  <div key={x._id}>
                    <DisplayFilm x={x} data={data} setData={setData} />
                    <Link
                      to={`film/${x._id}`}
                      style={{
                        color: "blue",
                        textDecoration: "underline",
                        display: "block",
                        marginTop: "0.5rem",
                      }}
                    >
                      {`Click to View ${x.title}`}
                    </Link>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "0.5rem",
                      }}
                    >
                      <Button
                        onClick={(e) => (e.preventDefault(), deleteFilm(x._id))}
                        variant="contained"
                        color="error"
                        sx={{ mr: 2 }}
                      >
                        Delete Film
                      </Button>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault(), editTitle(x._id, modifiedTitle);
                        }}
                      >
                        <TextField
                          onChange={(e) => setModifiedTitle(e.target.value)}
                          placeholder="Update Film Title"
                          variant="outlined"
                          sx={{ mr: 2 }}
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          color="success"
                        >
                          Make changes
                        </Button>
                      </form>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          addComment(x._id, comment);
                        }}
                      >
                        <TextField
                          onChange={(e) => {
                            setComment(e.target.value);
                          }}
                          placeholder="Enter comment..."
                          minLength={5}
                          type="text"
                        ></TextField>
                        <Button
                          disabled={loading}
                          style={{ color: "black" }}
                          type="submit"
                        >
                          Add Comment!
                        </Button>
                      </form>
                    </div>
                    {/* <Button type="submit" onClick={(e)=>{e.preventDefault();myFavorites(x.title)}}>
                    Add To Favorites!
                    </Button> */}
                    <p>{status}</p>
                  </div>
                ))
              ) : (
                <Typography variant="h5" fontWeight="bold" mt={4}>
                  {search ? "No results found" : "No Trailers Added"}
                </Typography>
              )}
            </Container>
          </Suspense>
        </>
      )}
    </>
  );
}

export default Movies;

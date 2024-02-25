/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext, Suspense } from "react";
import { UserData } from "../App";
import Axios from "axios";
import { Link } from "react-router-dom";
import DisplayFilm from "./DisplayFilm";
import BotPage from "./Bot";
import { Container, Typography, Button, TextField } from "@mui/material";
import { DeleteFilm, EditTitle, GetMain } from "./Services/Api";

const API_URL = "http://localhost:8000";

function Movies() {
  const { logged, setID, RingLoader, user,loading,setLoading,setStatus,status } = useContext(UserData);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
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

  async function editTitle(id, modifiedTitle) {
    try {
      setLoading(true);
      const {data} = await EditTitle(id, modifiedTitle);
      if(data.status===200){
        window.location.reload();
      }

      // setData((prevData) =>
      //   prevData.map((film) =>
      //     film._id === id ? { ...film, title: modifiedTitle } : film
      //   )
      // ); 
    } catch (error) {
      console.error("Error editing title:", error);
    } finally {
      setLoading(false);
      setModifiedTitle("");
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    setData([]);
    if (!search.trim()) {
      console.error("Search term is empty");
      return; // exit the function if search term is empty
    }
    try {
      setLoading(true);
      const response = await Axios.post(`${API_URL}/home/search`, { searchTerm: search });
      if (response.status === 200) {
        setData(response.data);
      }else if(response.status===400){
        setStatus("You haven't searched for anything!")
      }else if(response.status===404){
        setStatus("No results found!")
      }else{
        setStatus("Error!")
      }

    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setLoading(false);
      if(search===""){
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

 

  return (
    <>
      {!logged ? (
        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <div sx={{ textAlign: 'center' }}>
            <Typography variant="h3" fontWeight="bold" mb={4}>Welcome to VeloFlix! 🍿</Typography>
            <Typography variant="body1" mb={4}>
              Explore a world of movies and trailers. Join VeloFlix for a personalized experience.
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/login" sx={{ mr: 2 }}>
              Login
            </Button>
            <Typography variant="body1" mt={4}>
              Dont have an account?
              <Link to="/newuser" style={{ color: "blue", textDecoration: "underline" }}>
                Register here
              </Link>
            </Typography>
          </div>
        </Container>
      ) : (
        <div>
          <Button variant="contained" color="primary" onClick={viewBot} sx={{ mb: 2 }}>
            {showBot ? "Close!" : "Show Bot 🤖"}
          </Button>
          {showBot && <BotPage />}
          <Container maxWidth="md" sx={{ mx: "auto", p: 4 }}>
            {user?.photoURL && <img src={user.photoURL} alt="User" />}
            <Typography variant="h4" fontWeight="bold" mb={4}>
              {logged ? `Welcome back ${user.displayName || user.username}` : `Welcome Guest`}! , {time}
            </Typography>
            <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
              <TextField
                type="text"
                placeholder="Search Here..."
                value={search}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ mr: 2 }}
              />
              <Button type="submit" disabled={loading} variant="contained" color="primary">
                Search
              </Button>
            </form>
            {data && data.length ? (
              data.map((x) => (
                <div key={x._id}>
                  <DisplayFilm x={x} />
                  <Link to={`film/${x._id}`} style={{ color: "blue", textDecoration: "underline", display: "block", marginTop: "0.5rem" }}>
                    Click to View
                  </Link>
                  <div style={{ display: "flex", alignItems: "center", marginTop: "0.5rem" }}>
                    <Button onClick={() => deleteFilm(x._id)} variant="contained" color="error" sx={{ mr: 2 }}>
                      Delete Film
                    </Button>
                    <form onSubmit={(e)=>{
                      e.preventDefault(),editTitle(x._id, modifiedTitle)
                    }}>                    
                      <TextField
                      onChange={(e) => setModifiedTitle(e.target.value)}
                      placeholder="Update Film Title"
                      variant="outlined"
                      sx={{ mr: 2 }}
                    />
                    <Button type="submit" variant="contained" color="success">
                      Make changes
                    </Button>
                    </form>
                  </div>
                  <p>{status}</p>
                </div>
              ))
            ) : (
              <Typography variant="h5" fontWeight="bold" mt={4}>
                {search ? "No results found" : "No Trailers Added"}
              </Typography>
            )}
          </Container>
        </div>
      )}
    </>
  );
}

export default Movies;

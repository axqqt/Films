/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Link } from "react-router-dom";
import { googleProvider, auth, gitHubAuth } from "./Fire/FireConfig";
import { signInWithPopup, signOut } from "firebase/auth";
import { UserData } from "../App";

const Login = (props) => {
  const {
    status,
    setStatus,
    loading,
    setLoading,
    RingLoader,
    setLogged,
    setUser,
  } = useContext(UserData);

  const [data, setData] = useState({ username: "", password: "" });
  const usernameField = useRef();
  const passwordField = useRef();

  const endPoint = "http://localhost:8000";
  const navigate = useNavigate();

  const LogUser = async (e) => {
    e.preventDefault();
    if (status !== "") {
      setStatus("");
      try {
        setLoading(true);
        const response = await Axios.post(`${endPoint}/login`, data);
        console.log(response.data);
        setLogged(true);
        setUser(response.data?.username);
        navigate("/");
        console.log(response.data);
      } catch (err) {
        console.error(err);
        setStatus(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const signUpGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);

      if (response) {
        setLogged(true);
        setStatus("Google sign-in successful");
        setUser(auth?.currentUser);
        navigate("/");
      } else {
        setStatus("Error while logging in!");
      }
    } catch (err) {
      console.error(err);
      setStatus("Failed to sign in with Google");
    }
  };

  const signInGitHub = async () => {
    try {
      const response = await signInWithPopup(auth, gitHubAuth);

      if (response) {
        setLogged(true);
        setStatus("GitHub sign-in successful");
        setUser(auth?.currentUser);
        navigate("/");
      } else {
        setStatus("Error while signing in!");
      }
    } catch (err) {
      console.error(err);
      setStatus("Failed to sign in with GitHub");
    }
  };

  const handleLogout = async () => {
    try {
      if (auth && auth?.currentUser) {
        //for firebase
        await signOut(auth);
        setLogged(false);
        setStatus("Logged out!");
      } else {
        const response = await Axios.post(`${endPoint}/login/logout`); //normal login!

        if (response.status === 200) {
          setLogged(false);
          setStatus("Logged out!");
        } else if (response.status === 401) {
          setStatus(response?.data?.response?.data || "Unauthorized");
        } else {
          setStatus("Server issue!");
        }
      }
    } catch (error) {
      console.error("Logout error:", error);
      setStatus("Error during logout");
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: "5%", justifyContent: "space-evenly" }}>
      <h1>Login Page</h1>
      <form onSubmit={LogUser}>
        <input
          type="text"
          ref={usernameField}
          onChange={handleChange}
          placeholder="Enter Username"
          name="username"
        />
        <input
          ref={passwordField}
          type="password"
          onChange={handleChange}
          placeholder="Enter password"
          name="password"
        />
        <button type="submit" disabled={loading}>
          {loading ? <RingLoader></RingLoader> : "Login"}
        </button>
        <button onClick={signUpGoogle}>Sign Up With Google!</button>
        <button onClick={signInGitHub}>Sign Up with GitHub!</button>
        <br></br>
        <button onClick={handleLogout}>Log Out!</button>
        <h1>{status}</h1>
      </form>
      <br></br>
      <Link to="/newuser">Not a user yet? Click Here 😊</Link>
      <br></br>
      <Link to="/forgotpass">Forgot your password? Click Here</Link>
    </div>
  );
};

export default Login;

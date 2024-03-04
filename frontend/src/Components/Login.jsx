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
    logged,
    setUser,
  } = useContext(UserData);

  const [data, setData] = useState({ username: "", password: "" });
  const usernameField = useRef();
  const passwordField = useRef();

  const endPoint = "http://localhost:8000/login"; // Adjust this based on your backend URL
  const navigate = useNavigate();

  const LogUser = async (e) => {
    e.preventDefault();
    if (!logged) {
      try {
        setLoading(true);
        const response = await Axios.post(endPoint, data);
        if (response.status === 200) {
          const responseData = response.data;
          const { AccessToken, RefreshToken } = responseData;
          localStorage.setItem("accessToken", AccessToken);
          localStorage.setItem("refreshToken", RefreshToken);
          setLogged(true);
          setUser(responseData);
          navigate("/");
        } else {
          setStatus("Invalid Credentials!");
        }
      } catch (err) {
        console.error(err.message);
        if (err.response && err.response.status === 403) {
          setStatus("Username/Password Wrong!");
        } else {
          setStatus("An error occurred while logging in. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    } else {
      setStatus("User already logged in!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  const signUpGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      if (response) {
        setLogged(true);
        setStatus("Google sign-in successful");
        setTimeout(() => {
          setStatus("");
        }, 2000);
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLogged(false);
      setStatus("Logged out!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Logout error:", error);
      setStatus("Error during logout");
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return !logged ? (
    <div style={{ justifyContent: "space-evenly" }}>
      <h1>Login Page</h1>
      <p>Use Credentials veloxal for username and velo123 as password!</p>
      <form onSubmit={LogUser}>
        <input
          type="text"
          ref={usernameField}
          onChange={handleChange}
          placeholder="Enter Username"
          name="username"
          required
        />
        <input
          ref={passwordField}
          type="password"
          onChange={handleChange}
          placeholder="Enter password"
          name="password"
          required
          minLength={5}
        />
        <button type="submit" disabled={loading}>
          {loading ? <RingLoader /> : "Login"}
        </button>
        <button onClick={signUpGoogle}>Sign Up With Google!</button>
        <br />
        <button onClick={handleLogout}>Log Out!</button>
        <h1>{status}</h1>
      </form>
      <br />
      <Link to="/newuser">Not a user yet? Click Here 😊</Link>
      <br />
      <Link to="/forgotpass">Forgot your password? Click Here</Link>
    </div>
  ) : (
    <div>
      <h1>You are already logged in!</h1>
      <p>
        Click <Link to="/">Here</Link> to go back to the homepage! OR{" "}
        <button onClick={handleLogout}>Logout!</button>
      </p>
    </div>
  );
};

export default Login;

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../App";
import Axios from "axios";
import { Link } from "react-router-dom";
import { googleProvider, auth, gitHubAuth } from "./Fire/FireConfig";
import { signInWithPopup, signOut } from "firebase/auth";

const Login = (props) => {
  const { status, setStatus, loading, setLoading, RingLoader } =
    useContext(UserData);
  const [data, setData] = useState({ username: "", password: "" });
  const usernamefield = useRef();
  const passwordfield = useRef();
  const { setLogged } = props;

  const endPoint = "http://localhost:8000";

  let loginCounter = 0;

  console.log(auth?.currentUser?.email ? auth?.currentUser?.email : "");

  const navigate = useNavigate();

  const LogUser = async (e) => {
    e.preventDefault();
    if (status !== "") {
      setStatus("");
    }

    const { username, password } = data;

    try {
      setLoading(true);
      const response = await Axios.post(`${endPoint}/login`, {
        username,
        password,
      });

      if (response.data.status === 200) {
        loginCounter++;
        setStatus(response.data.response.data.Alert);
        setLogged(true);
        navigate("/");
      } else if (response.data.status === 404) {
        setStatus(response.data.data.Alert);
      } else {
        setStatus("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const signUpGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);

      if (response) {
        setLogged(true);
        setStatus("Google sign-in successful");
      } else {
        setStatus("Error while logging in!");
      }
    } catch (err) {
      console.error(err);
      setStatus("Failed to sign in with Google");
    }
  };

  const signUpGitHub = async () => {
    try {
      const response = await signInWithPopup(auth, gitHubAuth);

      if (response && response.user) {
        setLogged(true);
        setStatus("GitHub sign-in successful");
      } else {
        setStatus("Error while logging in!");
      }
    } catch (err) {
      console.error(err);
      setStatus("Failed to sign in with GitHub");
    }
  };

  const handleLogout = async () => {
    try {
      if (auth?.currentUser?.displayName) {
        await signOut(auth);
      } else if (loginCounter === 1) {
        const response = await Axios.post("/logout", loginCounter);
        if (response.status === 200) {
          setStatus("Logged out!");
        } else if (response.status === 401) {
          setStatus("No user was signed in to begin with!");
        } else {
          setStatus("Server issue!");
        }
      }
    } catch (err) {
      console.error(err);
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
          ref={usernamefield}
          onChange={handleChange}
          placeholder="Enter Username"
          name="username"
        />
        <input
          ref={passwordfield}
          type="password"
          onChange={handleChange}
          placeholder="Enter password"
          name="password"
        />
        <button type="submit" disabled={loading}>
          {loading ? <RingLoader></RingLoader> : "Login"}
        </button>
        <button onClick={signUpGoogle}>Sign Up With Google!</button>
        <button onClick={signUpGitHub}>Sign Up with GitHub!</button>
        <br></br>
        <button onClick={handleLogout}>Log Out!</button>
        <h1> {status}</h1>
      </form>
      <br></br>
      <Link to="/newuser">Not a user yet? Click Here 😊</Link>
      <br></br>
      <Link to="/forgotpass">Forgot your password? Click Here</Link>
    </div>
  );
};

export default Login;

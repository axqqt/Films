/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../App";
import Axios from "axios";
import { Link } from "react-router-dom";
import { googleProvider, auth, gitHubAuth } from "./Fire/FireConfig";
import { signInWithPopup, signOut } from "firebase/auth";
// import { useSignIn } from "react-auth-kit";

const Login = () => {
  const {
    status,
    setStatus,
    loading,
    setLoading,
    RingLoader,
    setLogged,
    user,
    setUser,
  } = useContext(UserData);
  const [data, setData] = useState({ username: "", password: "" });
  const usernamefield = useRef();
  const passwordfield = useRef();
  // const signIn = useSignIn();

  const endPoint = "http://localhost:8000";

  let loginCounter = 0;

  console.log(
    auth?.currentUser
      ? auth?.currentUser.displayName + "\n" + auth?.currentUser?.email
      : ""
  );

  const navigate = useNavigate();

  const LogUser = async (e) => {
    e.preventDefault();
    if (status !== "") {
      setStatus("");
    }

    try {
      setLoading(true);
      const response = await Axios.post(`${endPoint}/login`, data);

      if (response.data.status === 200) {
        setLogged(true);
        const userData = await Axios.post(`${endPoint}/login/status`);
        if (userData?.data?.username && userData?.data?.password) {
          //double checking if user has provided both username and pass
          setStatus(`${userData.data.username} has logged in!`);
        } else {
          setStatus("Invalid response format from server");
        }
      } else if (response.data.status === 401) {
        setStatus("Invalid Credentials!");
      } else {
        setStatus("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      setStatus("An error occurred while processing your request.");
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

  const signUpGitHub = async () => {
    try {
      const response = await signInWithPopup(auth, gitHubAuth);

      if (response && response?.user) {
        setLogged(true);
        setStatus("GitHub sign-in successful");
        setUser(response?.user);
        navigate("/");
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
      if (auth?.currentUser) {
        await signOut(auth);
      } else if (loginCounter === 1) {
        const response = await Axios.post(
          `${endPoint}/login/logout`,
          loginCounter
        );
        if (response.status === 200) {
          setStatus("Logged out!");
          setLogged(true);
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

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Link } from "react-router-dom";
import { googleProvider, auth, gitHubAuth } from "./Fire/FireConfig";
import { signInWithPopup, signOut } from "firebase/auth";
import { UserData } from "../App";
// import calculateMetrics from "lib/metrics";

// const getMetrics = cache();

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

  const endPoint = "http://localhost:8000/login";
  const navigate = useNavigate();

  let loginChecker = 0;

  const LogUser = async (e) => {
    const userPrior = localStorage.getItem("users");

    console.log(userPrior);
   
    e.preventDefault();
    if (!logged) {
      if (status !== "") {
        setStatus("");
      }
      try {
        setLoading(true);
        if(!userPrior){        
          const response = await Axios.post(`${endPoint}`, data);
        if (response.status === 200) {
          // alert(response.data.Alert);
          console.log(response.data);
          setLogged(true);
          setUser(response.data);
          navigate("/"); //bugs still exist here 🤔
        } else {
          alert("Invalid Credentials!"); //for now!
        }}else{
          const response = await Axios.post(`${endPoint}`, userPrior);
          if (response.status === 200) {
            // alert(response.data.Alert);
            console.log(response.data);
            setLogged(true);
            setUser(response.data);
            localStorage.setItem("user",data)
            navigate("/"); //bugs still exist here 🤔
          } else {
            alert("Invalid Credentials!"); //for now!
          }
        }

      } catch (err) {
        console.error(err);
        setStatus("Username/Password Wrong!");
      } finally {
        setLoading(false);
          if(loginChecker===1){
            localStorage.setItem("user",data) //set the data to log back type scenario?
          }
      }
    } else {
      setStatus("User already logged in!");
      setTimeout(()=>{
        navigate("/")
      },1500)
      
      
  
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
        loginChecker++;
      } else {
        const response = await Axios.post(`${endPoint}/logout`); //normal login!

        if (response.status === 200) {
          setLogged(false);
          setStatus("Logged out!");
          loginChecker++;
          setTimeout(() => {
            navigate("/");
          }, 3000);
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

  return !logged?(
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
          {loading ? <RingLoader/>: "Login"}
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
  ):<div><h1>You are already logged in!</h1><p>Click <Link to="/">Here</Link> to go back to the homepage! OR <button onClick={handleLogout}>Logout!</button></p></div>
};

export default Login;

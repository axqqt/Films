/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserData } from "../App";
import Axios from "axios";

const NewUser = () => {
  const { setStatus, setLoading, setData, data, loading, status, RingLoader,logged,setLogged } = useContext(UserData);

  const createUser = async (e) => {
    e.preventDefault();
    if (setStatus !== "") {
      setStatus("");
    }

    const { username, password, mail, image } = data;

    const formData = new FormData();
    formData.append("username",username);
    formData.append("password",password);
    formData.append("mail",mail);
    formData.append("image",image);
    const response = await Axios.post("http://localhost:8000/register" || "https://films-backend.vercel.app/register", {
      formData
      },{headers:{"Content-Type":"multipart/form-data"}});
    try {
      setLoading(true);


      if (response.status === 201) {
        setStatus(`${username} Created`);
        setLogged(true);
        navigator("/login");
      } 
    } catch (err) {
      console.error(err);
      if (response.data.status === 409) {
        setStatus(`${username} or ${mail} already exist`);
      } else if (response.data.status === 400) {
        setStatus("Required fields not filled");
      }
    } finally {
      setLoading(false);
    }
  };

  

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setData({ ...data, image: e.target.files[0] });
  };
  

  return !logged && !loading?(
    <>
      <h1>Welcome to VeloFlix</h1>
      <h1>Register</h1>
      <form onSubmit={createUser}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Enter Username"
          name="username"
        />
        <input
          type="password"
          onChange={handleChange}
          placeholder="Enter password"
          name="password"
        />
        <input
          type="email"
          onChange={handleChange}
          placeholder="Enter mail"
          name="mail"
        />
        <input
        onChange={handleFileChange}
        placeholder="Enter Photo"
        name="image"
        type="file"
      />
        {/**File handling part incomplete! */}
        <p>{status ? status : ""}</p>
        <button type="submit" disabled={loading}>
          {loading ? <RingLoader/> : "Create User"}
        </button>
      </form>
      <p>{status}</p>
      <p>
        Already a user? <Link to="/login">Click Here to Login!</Link>
      </p>
    </>
  ) : <div><h1>You are already logged in!</h1><p>Click <Link to="/">Here</Link> to go back to the homepage!</p></div>;
};

export default NewUser;

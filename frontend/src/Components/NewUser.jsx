/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserData } from "../App";
import Axios from "axios";

const NewUser = (props) => {
  const datax = useContext(UserData);

  const { setStatus, setLoading, setData, data, loading, status, RingLoader } =
    datax;

  // eslint-disable-next-line no-unused-vars
  const { setLogged, setUser } = props;

  const createUser = async (e) => {
    e.preventDefault();
    if (setStatus !== "") {
      setStatus("");
    }

    const { username, password, mail, photo } = data;

    try {
      setLoading(true);
      const response = await Axios.post("http://localhost:8000/register", {
        username,
        password,
        mail,
        photo,
      });

      if (response.data.status === 201) {
        setStatus(`${username} Created`);
        setLogged(true);
        navigator("/login");
      } else if (response.status === 409) {
        setStatus(`${username} or ${mail} already exist`);
      } else if (response.status === 400) {
        setStatus("User already exists");
      }
    } catch (err) {
      console.error(err);
      setStatus(err.response.data.Alert);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
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
          onChange={handleChange}
          placeholder="Enter Photo"
          name="photo"
          type="file"
        />{" "}
        {/**File handling part incomplete! */}
        <p>{status ? status : ""}</p>
        <button type="submit" disabled={loading}>
          {loading ? <RingLoader></RingLoader> : "Create User"}
        </button>
      </form>
      <p>
        Already a user? <Link to="/login">Click Here to Login!</Link>
      </p>
    </>
  );
};

export default NewUser;

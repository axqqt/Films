/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { UserData } from "../../App";
import Axios from "axios";

const NewAdminPage = () => {
  const data = useContext(UserData);

  const { setLoading, loading, status, setStatus, RingLoader } = data;

  const endPoint = "http://localhost:8001";
  const [admin, setAdmin] = useState({ username: "", password: "", mail: "" });

  async function newAdmin(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.post(`${endPoint}/main`, admin);
      if (response.data.status === 201) {
        setStatus("Admin Created!");
      } else {
        setStatus("Error!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Admin Page!</h1>
      <form onSubmit={newAdmin}>
        <input
          onChange={handleChange}
          name="username"
          placeholder="Enter username..."
        ></input>
        <input
          onChange={handleChange}
          name="password"
          placeholder="Enter password..."
        ></input>
        <input
          onChange={handleChange}
          name="mail"
          placeholder="Enter mail..."
        ></input>
        <button type="submit" disabled={loading}>
          {loading ? RingLoader : "Create Admin!"}
        </button>
      </form>
    </div>
  );
};

export default NewAdminPage;

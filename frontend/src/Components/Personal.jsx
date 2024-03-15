/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../App";
import Axios from "axios";
import DefaultLogin from "./DefaultLogin";
import { auth } from "./Fire/FireConfig";
import { signOut } from "firebase/auth";

const Personal = () => {
  const BASE =
    "http://localhost:8000/users/specific" ||
    "https://films-backend.vercel.app/users/specific";
  const { user, logged, loading, setLoading, setStatus, setLogged,RingLoader } =
    useContext(UserData);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function fetchUserData() {
    setLoading(true);
    try {
      const { data } = await Axios.post(BASE, { id: user.id });
      setUserData(data);
    } catch (err) {
      console.error(err);
      setError("Error fetching user data");
    } finally {
      setLoading(false);
    }
  }

  async function increaseFollowers() {
    try {
      setLoading(true);
      await Axios.put(BASE, { id: user.id }).then(() =>
        setStatus("Increased followers!")
      );
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  let loginChecker = 0;

  const handleLogout = async () => {
    const response = await Axios.post(
      `localhost:8000/login/logout` ||
        "https://films-backend.vercel.app/login/logout"
    );
    try {
      if (auth && auth?.currentUser) {
        await signOut(auth);
        setLogged(false);
        setStatus("Logged out!");
        loginChecker++;
      } else {
        if (response.status === 200) {
          setLogged(false);
          setStatus("Logged out!");
          loginChecker++;
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Logout error:", error);
      if (error.response.status === 401) {
        setStatus(response?.data?.response?.data || "Unauthorized");
      } else {
        setStatus("Server issue!");
      }
    }
  };

  useEffect(() => {
    if (logged) {
      fetchUserData();
    }
  }, [logged]);

  const emptyPfp =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  return logged && user && !loading ? (
    <div style={{ fontSize: 32 }}>
      <h1>Personal</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div>
          {userData && Object.keys(userData).length ? (
            <div style={{ textAlign: "center" }}>
              <img
                src={userData.photo || emptyPfp}
                alt={`Image of ${userData.username || user.photoURL}`}
                style={{
                  borderRadius: "50%",
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
              <h1> {userData.username || user.username}</h1>
              <p>Followers : {userData.followers}</p>
              <p>Following : {userData.following}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  increaseFollowers(userData._id);
                }}
              >
                Follow!
              </button>
              <br />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                Log Out!
              </button>
            </div>
          ) : (
            <h1>No User Data found!</h1>
          )}
        </div>
      )}
    </div>
  ) : loading ? <RingLoader/>: (
    <DefaultLogin />
  );
};

export default Personal;

/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { UserData } from "../App";
import Axios from "axios";
import DefaultLogin from "./DefaultLogin";

const Personal = () => {
  const BASE = "http://localhost:8000/users/specific";
  const { user, logged, loading, setLoading } = useContext(UserData);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);

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

  useEffect(() => {
    if (logged) {
      fetchUserData();
    }
  }, [logged]); 

  const emptyPfp = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  return logged ? (
    <div style={{fontSize:32}}>
      <h1>Personal</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div>
          {userData && Object.keys(userData).length ? ( 
            <div style={{textAlign:"center"}}>
             <img
  src={userData.photo || emptyPfp}
  alt={`Image of ${userData.username}`}
  style={{
    borderRadius: '50%', 
    width: '150px', 
    height: '150px', 
    objectFit: 'cover', 
  }}
/>

              <h1> {userData.username}</h1>
              <p>Followers : {userData.followers}</p>
              <p>Following : {userData.following}</p>
            
            </div>
          ) : (
            <h1>No User Data found!</h1>
          )}
        </div>
      )}
    </div>
  ) : (
    <DefaultLogin />
  );
};

export default Personal;

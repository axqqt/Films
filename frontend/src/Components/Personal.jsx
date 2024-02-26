/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { UserData } from "../App";
import Axios from "axios";
import DefaultLogin from "./DefaultLogin";

const Personal = () => {
  const BASE = "http://localhost:8000/users/specific";
  const { user, logged,loading, setLoading } = useContext(UserData);
  const [userData, setUserData] = useState([]);
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
    fetchUserData();
  }, []);

  return logged ? (
    <div>
      <h1>Personal</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div>
          <p>{JSON.stringify(userData)}</p>
          {userData.length ? (
            userData.map((userDataItem, index) => (
              <div key={userDataItem._id || index}>
                <h1>Username {userDataItem.username}</h1>
                <p>{userDataItem.mail}</p>
                {userDataItem.photo && (
                  <img
                    src={userDataItem.photo}
                    alt={`Image of ${userDataItem.username}`}
                  />
                )}
              </div>
            ))
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

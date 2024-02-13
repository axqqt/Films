/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext, Suspense } from "react";
import { UserData } from "../App";
import { DeleteUsers } from "./Services/Api";

const DisplayUsers = () => {
  const [users, setUsers] = useState([]);
  const { loading, setLoading, RingLoader } = useContext(UserData);

  async function UserDatax() {
    try {
      setLoading(true);
      const r = await UserData();
      setUsers(r);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    UserDatax();
  }, []);

  async function DeleteUser(id) {
    try {
      setLoading(true);
      const response = await DeleteUsers(id).then(() => {
        if (response.status === 200) {
          UserData();
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Suspense fallback={<RingLoader/>}>
        {users && users.length ? (
        users.map((x) => (
          <div key={x._id}>
            <br></br>
            <label>
              <p>ID is {x._id}</p>
              <h1>Username : {x.username}</h1>
              <h2>Password : {x.password}</h2>
              <h3>Mail : {x.mail}</h3>
              <img src={x.photo} alt=""></img>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  DeleteUser(x._id);
                }}
              >
                Delete User
              </button>
            </label>
            <br></br>
          </div>
        ))
      ) : (
        <h2>No Users Found!</h2>
      )}</Suspense>
    </div>
  );
};

export default DisplayUsers;

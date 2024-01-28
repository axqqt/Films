import { useEffect, useState, useContext } from "react";
import { UserData } from "../App";
import { DeleteUsers } from "./Services/Api";

const DisplayUsers = () => {
  const [users, setUsers] = useState([]);
  const datax = useContext(UserData);
  const { loading, setLoading, RingLoader } = datax;

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
      {loading ? (
        <RingLoader></RingLoader>
      ) : users && users.length ? (
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
      )}
    </div>
  );
};

export default DisplayUsers;

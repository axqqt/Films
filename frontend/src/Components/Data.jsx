import { useEffect, useState } from "react";
import { db } from "./Fire/FireConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

const FireData = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const dataCollection = collection(db, "users");

  async function fetchData() {
    try {
      setLoading(true);
      const docs = await getDocs(dataCollection);
      const filtered = docs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUserData(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const addSomeData = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await addDoc(dataCollection, {
        usersName: formData.username,
        usersPassword: formData.password,
      });
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>Users</h1>
      {JSON.stringify(userData)}
      <div>
        {userData.map((x) => (
          <div key={x.id} style={{ padding: "3%" }}>
            <h1>{`ID is -> ${x.id}`}</h1>
            <h1>Username : {x.username}</h1>
            <h1>Password : {x.password}</h1>
          </div>
        ))}
      </div>
      <form onSubmit={addSomeData}>
        <input
          onChange={handleChange}
          value={formData.username}
          name="username"
          placeholder="Enter Username..."
        ></input>
        <input
          onChange={handleChange}
          value={formData.password}
          name="password"
          placeholder="Enter password..."
        ></input>
        <button type="submit" disabled={loading}>
          Add Data!
        </button>
      </form>
    </div>
  );
};

export default FireData;

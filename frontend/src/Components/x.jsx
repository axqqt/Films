import Axios from "axios";
import { useEffect, useState } from "react";

const XPage = () => {
  const [data, setData] = useState([]);
  const [spring, setSpring] = useState([]);

  const sqlTest = async () => {
    try {
      const data = await Axios.get("http://localhost:8000/sql");
      setData(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const Spring = async () => {
    try {
      const data = await Axios.get("http://localhost:4000/home");
      setSpring(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    sqlTest();
    Spring();
  }, []);

  return (
    <div>
      <h1>X Page</h1>
      {data.map((x) => (
        <div key={x.department_id}>
          <h1>{x.department_name}</h1>
          <p>{`Location id is -> ${x.location_id}`}</p>
        </div>
      ))}
      {JSON.stringify(spring)}
    </div>
  );
};

export default XPage;

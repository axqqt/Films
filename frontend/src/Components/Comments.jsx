/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { UserData } from "../App";
import RingLoader from "react-spinners/RingLoader";
import { GetComments } from "./Services/Api";
const Comments = () => {
  const { loading, setLoading } = useContext(UserData);
  const [comments, setComments] = useState([]);
  async function getComments() {
    try {
      setLoading(true);
      const data = await GetComments();
      setComments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div>
      <h1>Comments</h1>
      {loading ? (
        <RingLoader />
      ) : comments && comments.length ? (
        JSON.stringify(comments)
      ) : (
        "No comments posted!"
      )}
    </div>
  );
};

export default Comments;

/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { UserData } from "../App";
import RingLoader from "react-spinners/RingLoader";
import { GetComments } from "./Services/Api";
import Axios from "axios";
const Comments = () => {
  const { loading, setLoading } = useContext(UserData);
  const [comments, setComments] = useState([]);
  const [msg, setMsg] = useState("");
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

  async function addComment(id) {
    try {
      setLoading(true);
      await Axios.post(`http://localhost:8000/comments/${id}`, {
        comment: msg,
      });
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
        comments.map((x) => (
          <div key={x._id}>
            <p>{x.comment}</p>
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addComment(x._id);
                }}
              >
                <input
                  onChange={(e) => {
                    setMsg(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter Message..."
                ></input>
                <button type="submit">
                  {loading ? "Loading..." : "Add Comment!"}
                </button>
              </form>
            </div>
          </div>
        ))
      ) : (
        "No comments posted!"
      )}
    </div>
  );
};

export default Comments;

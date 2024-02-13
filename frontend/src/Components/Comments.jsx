/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, useContext, useEffect, useState } from "react";
import { UserData } from "../App";
import RingLoader from "react-spinners/RingLoader";
import { GetComments } from "./Services/Api";
import Axios from "axios";
import { Link } from "react-router-dom";
const Comments = () => {
  const { loading, setLoading,logged } = useContext(UserData);
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
    logged?<div>
    <h1>Comments</h1>
    <Suspense fallback={<RingLoader/>}>{comments && comments.length ? (
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
    )}</Suspense>
    
  </div>:<div><h1>Please <Link to="/login">Login</Link> to Continue! </h1></div>
  );
};

export default Comments;

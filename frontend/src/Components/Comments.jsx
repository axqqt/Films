/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, useContext, useEffect, useState } from "react";
import { UserData } from "../App";
import RingLoader from "react-spinners/RingLoader";
import { AddComments, DelComments, GetComments } from "./Services/Api";
import { Link } from "react-router-dom";
const Comments = () => {
  const { loading, setLoading,logged } = useContext(UserData);
  const [comments, setComments] = useState([]);
  const [msg, setMsg] = useState("");
  const theID = comments.filter((x)=>x._id);




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

  async function addComment(id,msg) {
    try {
      setLoading(true);
      await AddComments(id,msg)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function delComment(id) {
    try {
      setLoading(true);
      await DelComments(id);
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
    <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addComment(theID,msg);
              }}
            >
              <input
                onChange={(e) => {
                  setMsg(e.target.value);
                }}
                type="text"
                placeholder="Enter Message..."
              ></input>
              <button type="submit" disabled={loading}>
                Add Comment
              </button>
            </form>
            <button onClick={(e)=>{e.preventDefault();delComment(theID)}}>Delete Comment</button>
          </div>
    <Suspense fallback={<RingLoader/>}>{comments && comments.length ? (
      
      comments.map((x) => (
        <div key={x._id}>
          <h1>{x.title}</h1>
        </div>
      ))
    ) : (
      "No comments posted yet!"
    )}</Suspense>
      <p>{JSON.stringify(comments)}</p>
  </div>:<div><h1>Please <Link to="/login">Login</Link> to Continue! </h1></div>
  );
};

export default Comments;

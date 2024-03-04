/* eslint-disable no-unused-vars */
import { Suspense, useState } from "react";

import RingLoader from "react-spinners/RingLoader";
import { Gemini } from "./Services/Api";
const BotPage = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);

  let promptCounter = 0;

  async function sendPrompt(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const promptResponse = await Gemini(data);
      if (promptResponse.status === 200) {
        setResponse(promptResponse);
        promptCounter++;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ margin: "5%" }}>
      <h1>Gemini</h1>
      <form onSubmit={sendPrompt}>
        <input
          onChange={(e) => {
            setData(e.target.value);
          }}
          placeholder="Ask Gemini"
        />
        <button type="submit">Enter</button>
      </form>
      <h1>
        {promptCounter === 0
          ? "Hi i'm Velo , How may I help you today? 🤖"
          : "Anything else , I could assist you with?"}
      </h1>
      <Suspense fallback={loading}>
        {" "}
        <p>
          {response.map((x, index) => (
            <h1 key={index}>{x}</h1>
          ))}
        </p>{" "}
      </Suspense>
    </div>
  );
};

export default BotPage;

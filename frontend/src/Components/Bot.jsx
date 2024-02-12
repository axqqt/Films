import { useState } from "react";

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
      setResponse(promptResponse);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ margin: "5%" }}>
      <h1>Gemini</h1>
      <input
        onChange={(e) => {
          setData(e.target.value);
        }}
        placeholder="Ask Gemini"
      />
      <h1 >{promptCounter===0?"Hi i'm Velo , How may I help you today? 🤖":""}</h1>
      {loading ? (
        <RingLoader></RingLoader>
      ) : (
        <p>{JSON.stringify(response.generatedText)}</p>
      )}
      <button onClick={sendPrompt}>Enter</button>
    </div>
  );
};

export default BotPage;

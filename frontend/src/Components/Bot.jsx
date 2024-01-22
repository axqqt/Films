import { useState } from "react";
import Axios from "axios";
import RingLoader from "react-spinners/RingLoader";
const BotPage = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);

  async function sendPrompt(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await Axios.post("http://localhost:8000/gemini", {
        data: data,
      });
      setResponse(result.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Gemini</h1>
      <input
        onChange={(e) => {
          setData(e.target.value);
        }}
        placeholder="Ask Gemini"
      />
      <p>
        {loading ? (
          <RingLoader></RingLoader>
        ) : response.length ? (
          response.map((item, index) => (
            <div key={index}>
              {item.replace("\n", "").map((line, i) => (
                <h1 key={i}>{line}</h1>
              ))}
            </div>
          ))
        ) : data === "" ? (
          ""
        ) : (
          <p>No results found</p>
        )}
      </p>
      <p>{JSON.stringify(response.generatedText)}</p>
      <button onClick={sendPrompt}>Enter</button>
    </div>
  );
};

export default BotPage;

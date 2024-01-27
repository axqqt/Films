import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:4000");

const Socket = () => {
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [userMessages, setUserMessages] = useState([]);
  const [systemMessages, setSystemMessages] = useState([]);

  let socketCount = 0;

  useEffect(() => {
    const handleConnect = (err) => {
      if (err) throw err;
      socketCount++;
      console.log("Connected to server");
      setIsConnected(true);
    };

    const handleUserMessage = (message) => {
      if (socketCount === 1) {
        console.log("Received user message:", message);
        setUserMessages((prevMessages) => [...prevMessages, message]);
      } else {
        console.log("Not connected!");
      }
    };

    const handleSystemMessage = (message) => {
      console.log("Received system message:", message);
      setSystemMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("connect", handleConnect);
    socket.on("message", handleUserMessage);
    socket.on("remove", handleSystemMessage);

    return () => {
      socket.disconnect();
      setIsConnected(false);
    };
  }, []);

  const send = () => {
    socket.emit("message", input);
    setInput("");
  };

  return (
    <div>
      <h1>Chat Page!</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Input..."
      />
      <button onClick={send} disabled={!isConnected}>
        Send
      </button>
      <ul>
        {userMessages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <div>
        <h2>System Messages:</h2>
        <ul>
          {systemMessages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Socket;

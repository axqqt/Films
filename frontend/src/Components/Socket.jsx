/* eslint-disable react-hooks/exhaustive-deps */
import { io } from "socket.io-client";
import { useContext, useEffect, useState } from "react";
import DefaultLogin from "./DefaultLogin";
import { UserData } from "../App";

const socket = io("http://localhost:4000");

const Socket = () => {
  const {logged} = useContext(UserData)
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [userMessages, setUserMessages] = useState([]);
  const [systemMessages, setSystemMessages] = useState([]);

  let socketCount = 0;

  useEffect(() => {
    const handleConnect = (err,data) => {
      if (err) throw err;
      socketCount++;
      console.log("Connected to server");
      setIsConnected(true);
      alert(data);
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
    socket.on("join", (data) => {
      console.log(`Received Data! ${data}`);
    });

    return () => {
      socket.disconnect();
      setIsConnected(false);
    };
  }, []);

  const send = () => {
    socket.emit("message", input);
    setInput("");
  };

  return logged?
  (
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
  ): <DefaultLogin/>
};

export default Socket;

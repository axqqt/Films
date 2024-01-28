const { createServer } = require("http");
const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
app.use(cors({ origin: "*" }));

io.on("connect", (err, socket) => {
  try {
    if (err) throw err;
    socket.on("message", (data) => {
      io.emit("message", data);
      console.log(data);
    });

    socket.on("remove", (data) => {
      io.emit("remove", data);
    });
  } catch (err) {
    console.log(err);
  }
});

httpServer.listen(4000, () => {
  console.log("Server is listening on port 4000");
});

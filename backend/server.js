const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const cluster = process.env.CLUSTER;
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const mongoose = require("mongoose");
const homepage = require("./routes/home");
const { join } = require("path");
const morgan = require("morgan");
const fs = require("fs");
const register = require("./routes/users");
const login = require("./routes/login");
const gemini = require("./routes/gemini");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const linked = require("./routes/linked");
const cart = require("./routes/cart");
const adminMain = require("./routes/admin/adminMain");
// const limiter = require("./limiter");
const session = require("express-session");
const discordHandler = require("./security/discordAuth.js");
const passport = require("passport");

const errorHandler = require("./errors/errorHandler.js");

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

function midLog(req, res, next) {
  console.log(`Request coming from ${req.url} \nMethod-> ${req.method}`);
  next();
}

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "password123",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session(discordHandler));

app.use(errorHandler);
app.use(cors({ origin: "*" }));
if (!fs.existsSync(join(__dirname, "public"))) {
  fs.mkdirSync(join(__dirname, "public"));
}

app.use(helmet());
app.use(compression({ filter: false }));
app.use(express.static(join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("*", (req, res, next) => {
  console.log(JSON.stringify(req.session));
  console.log(JSON.stringify(req.cookies));
  next();
});

app.use(midLog);
app.use("/home", homepage);
app.use("/links", linked);
app.use("/gemini", gemini);
app.use("/cart", cart);
app.use("/login", login);
app.use("/register", register);
// app.use(isAuthenticated);

app.use("*", (req, res) => {
  res.sendFile(join(__dirname, "./views/404", "404.html"));
});

const admin = express();
admin.use(express.json({ limit: "50mb" }));
admin.use(cors());
admin.use("/main", adminMain);

async function connectDB() {
  try {
    await mongoose.connect(cluster, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Cluster!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

async function adminBoot() {
  admin.listen(8001, () => {
    connectDB();
    console.log("Admin up on port 8001");
  });
}

adminBoot();

async function clientBoot() {
  try {
    app.listen(port, () => {
      connectDB();
      console.log(`Client is up on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting client:", error);
  }
}

clientBoot();

const { createServer } = require("http");
const { Server } = require("socket.io");

const server = express();
const httpServer = createServer(server);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    io.emit("message", data);
    console.log(data);
  });

  socket.on("remove", (data) => {
    io.emit("remove", data);
  });
});

httpServer.listen(4000, () => {
  console.log("Server is listening on port 4000");
});

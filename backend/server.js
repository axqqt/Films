const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.port || 3000;
const cluster = process.env.cluster;
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
const limiter = require("./limiter");
const session = require("express-session");
const discordHandler = require("./security/discordAuth.js");
const gptGenerate = require("./routes/gpt.js");
const sqlPath = require("./routes/secondary.js");
const passport = require("passport");
const errorHandler = require("./errors/errorHandler.js");
const commentsModel = require("./routes/comments.js");

// function isAuthenticated(req, res, next) {
//   if (req?.session?.user) {
//     const instance = req?.session?.user;
//     res.status(200).send(`${JSON.stringify(instance.username)} has Logged in!`);
//     req.session.save((err) => {
//       if (err) throw err;
//       next();
//     });
//   } else {
//     res.status(401).send("Unauthorized");
//   }
// }

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "password123",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
    },
  })
);

// app.use(passport.initialize());
// app.use(passport.session(discordHandler)); //haven't implemented properly!

// app.post("/api/auth", passport.authenticate("discord"), (req, res) => {});

function midLog(req, res, next) {
  console.log(
    `Request coming from ${req.url} \nMethod-> ${
      req.method
    }\nSession -> ${JSON.stringify(req?.session)})}\nID -> ${JSON.stringify(
      req.session.id
    )}`
  );
  next();
}

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], //react project
  })
);

if (!fs.existsSync(join(__dirname, "public"))) {
  fs.mkdirSync(join(__dirname, "public"));
}

app.use(midLog);
app.use(helmet());
app.use(compression({ filter: false }));
app.use(express.static("public", { maxAge: 31536000 }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(compression());
app.use(limiter, (req, res, next) => {
  next();
});

const info = (req, res, next) => {
  console.log(
    `User -> ${JSON.stringify(req.session)}\nID -> ${req.session.id}`
  );
  next();
};

// app.use(limiter);
app.use(info);
app.use("/register", register);
app.use("/login", login);
// app.use(isAuthenticated);
app.use("/comments", commentsModel);
app.use("/home", homepage);
app.use("/links", linked);
app.use("/gemini", gemini);
app.use("/cart", cart);
app.use("/images", gptGenerate);
app.use("/sql", sqlPath);

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

app.use("*", (req, res) => {
  res.sendFile(join(__dirname, "./views/404", "404.html"));
});

const admin = express();
admin.use(express.json({ limit: "50mb" }));
admin.use(cors());
admin.use("/main", adminMain);

async function adminBoot() {
  try {
    await connectDB();
    admin.listen(8001, () => {
      console.log("Admin up on port 8001");
    });
  } catch (error) {
    console.error("Error starting admin:", error);
  }
}

async function clientBoot() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Client is up on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting client:", error);
  }
}

Promise.all([adminBoot(), clientBoot()]);

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connect", (err, socket) => {
  try {
    if (err) throw err;
    socket.on("message", (data) => {
      io.emit("message", data);
      console.log(data.id);
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

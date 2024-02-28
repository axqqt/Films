const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.port;
const cluster = process.env.mongodb_cluster;
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const mongoose = require("mongoose");
const homepage = require("./routes/home");
const { join } = require("path");
const fs = require("fs");
const register = require("./routes/users");
const login = require("./routes/login");
const gemini = require("./routes/gemini");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const linked = require("./routes/linked");
const limiter = require("./limiter");
const session = require("express-session");
const gptGenerate = require("./routes/gpt.js");
const commentsModel = require("./routes/comments.js");
const morgan = require("morgan");
const paymentRoute = require('./routes/payments.js')

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
  store:false
  })
);

function authenticated(req,res,next){
    if(req.session.user){
      console.log(req.session.user)
    }else{
      console.log("Not logged in!");
    }
    next();
}

// app.use(cookieSession({
//   name: 'session',
//   keys: [/* secret keys */],

//   // Cookie Options
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173","https://films-frontend.vercel.app"], //react project
  })
);


if (!fs.existsSync(join(__dirname, "public"))) {
  fs.mkdirSync(join(__dirname, "public"));
}

app.disable('x-powered-by')
app.use(compression({ filter: false }));
app.use(express.static("public", { maxAge: 31536000 }));
app.use(bodyParser.urlencoded({ extended: true }));

const userData = require("./routes/users.js")

app.use(helmet());
app.use(limiter,(next)=>{
    next();
})
app.use(morgan("dev"))
app.use("/register", register);
app.use("/login", login);
app.use(authenticated)
app.use("/home", homepage);
app.use("/comments", commentsModel);
app.use("/links", linked);
app.use("/gemini", gemini);
app.use("/users",userData);
app.use("/payments",paymentRoute)
app.use("/images", gptGenerate); //INCLUDED THIS JUST FOR FUN

app.get("/", (req, res) => {
  res.send("<h1>Hey Docker! 🐳👋🏻</h1>");
});

async function connectDB() {
  try {
    await mongoose.connect(cluster, {
      useNewUrlParser: true,
    });


    console.log("Connected to Cluster!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

app.use("*", (req, res) => {
  res.sendFile(join(__dirname, "./views/404", "404.html"));
});

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
clientBoot();

// const { createServer } = require("http");
// const { Server } = require("socket.io");
// const { log } = require("console");


// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: ["http://localhost:5173", "http://127.0.0.1:5173"], //react proj
//   },
// });

// io.on("connect", (err, socket) => {
//   try {
//     if (err) throw err;
//     socket.on("message", (data) => {
//       io.emit(data);
//     });

//     socket.on("remove", (data) => {
//       io.emit("remove", data);
//     });

//     socket.on("join", (data) => {
//       socket.join(data);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// httpServer.listen(4000, () => {
//   console.log("Server is listening on port 4000");
// });

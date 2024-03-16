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
const youtube = require("./routes/yt.js")
app.use(express.json());
app.use(cookieParser());
// const MongoStore = require('connect-mongo');
// // const sessionStore = new MongoStore({client:cluster,collectionName:"sessions"})

app.use(
  session({
    secret: "password123",
    resave: false,
    saveUninitialized: true,   
    cookie: {
      maxAge: 60000,
    },
  store:false,
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


app.use(
  cors({
    origin: ["https://films-frontend.vercel.app"], //react project
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
app.use("/tube",youtube)
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

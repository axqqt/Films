const userController = require("../models/registration");
const HashPasswordx = require("../security/hashing");
const jwt = require("jsonwebtoken");

const Login = async (req, res, next) => {
  try {
    const { username, password } = req?.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ alert: `Username or password not provided` });

    const userValidity = await userController
      .findOne({ username: username })
      .exec();

    if (!userValidity) {
      return res.status(403).json({ alert: `Invalid username or password` });
    } else {
      const secure = new HashPasswordx();
      const passwordMatch = secure.compare(password, userValidity.password);

      if (!passwordMatch)
        return res.status(404).json({ alert: "Invalid username or password" });

      const accessTokenPayload = {
        username: userValidity.username,
        userId: userValidity._id,
      };

      const AccessToken = jwt.sign(
        accessTokenPayload,
        process.env.ACCESS_TOKEN,
        { expiresIn: "1h" }
      );

      const RefreshToken = jwt.sign(
        { username: userValidity.username },
        process.env.REFRESH_TOKEN,
        { expiresIn: "7d" }
      );

      req.session.user = {
        username: username,
        password: password,
      };

      return res.status(200).json({
        alert: `${username} logged in!`,
        Token: AccessToken,
        RefreshToken: RefreshToken,
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const status = (req, res) => {
  try {
    if (req?.session?.user) {
      //optional chaining cuz I dont' want it to crash if the session is not there!
      console.log("Load back!");
      return res.status(200).json({
        status: `${req?.session?.user?.username} Logged In!`,
        username: `${req?.session?.user?.username}`, //get the username and get the password in hopes of mapping in the frontend!
        password: `${req?.session?.user?.password}`,
      });
    } else {
      console.log("Cannot Load!");
      return res.status(401).json({ status: "User is not logged in" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  try {
    if (req?.session?.user) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          res.status(500).send("Internal Server Error");
        } else {
          res.status(200).send("Logout successful");
        }
      });
    } else {
      res.status(401).send("No user logged in!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { Login, status, logout };

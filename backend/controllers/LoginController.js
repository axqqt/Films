const userController = require("../models/registration");
const HashPasswordx = require("../security/hashing");
const jwt = require("jsonwebtoken");

const Login = async (req, res, next) => {
  console.log("\n");
  
  console.log(req.session);
  if (!req?.session?.user) {
    try {
      const { username, password } = req?.body;

      if (!username || !password)
        return res
          .status(400)
          .json({ alert: `Username or password not provided` });

      const userValidity = await userController.findOne({ username }).exec();

      if (!userValidity) {
        return res.status(403).json({ alert: `Invalid username` });
      } else {
        const secure = new HashPasswordx();
        const passwordMatch = secure.compare(password, userValidity.password);

        if (!passwordMatch)
          return res.status(401).json({ alert: "Invalid password" });

        const accessTokenPayload = {
          username: userValidity.username,
          userId: userValidity._id,
        };

        const AccessToken = jwt.sign(
          accessTokenPayload,
          process.env.access_token,
          { expiresIn: "1h" }
        );

        const RefreshToken = jwt.sign(
          { username: userValidity.username },
          process.env.refresh_token,
          { expiresIn: "7d" }
        );

        // await req.cookie({username,password,maxAge:60000})

        req.session.user = { username , _id:userValidity._id, maxAge:60000,}; //this is not saving!

        return res.status(200).json({
          Alert: `${username} logged in!`,
          AccessToken,
          RefreshToken,
          username,
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res
      .status(400)
      .json({ Alert: `${req.session.user.username} already logged in!` });
  }
};

const status = (req, res) => {
  try {
    if (req?.session?.user) {
      console.log("Load back!");
      return res.status(200).json({
        status: `${req.session.user.username} Logged In!`,
        username: req.session.user.username,
        Session: req.session,
      });
    } else {
      console.log("Cannot Load!");
      return res.status(401).json({ status: "User is not logged in" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
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

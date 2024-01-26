const passport = require("passport");
const { Strategy } = require("passport-discord");
const userModel = require("../models/userOrder");

const discordHandler = passport.use(
  new Strategy(
    {
      clientID: "your-client-id",
      clientSecret: "your-client-secret",
      callbackURL: "your-callback-url",
    },
    async (accessToken, refreshToken, profile, done) => {
      const { username } = profile;

      try {
        const findUser = await userModel.findOne({ username });

        if (!findUser) {
          throw new Error("User not found!");
        }

        if (findUser.password !== password) {
          throw new Error("Invalid Credentials!");
        }

        done(null, findUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = discordHandler;

const passport = require("passport");
const { Strategy } = require("passport-discord");
const userModel = require("../models/userOrder");

const discordHandler = passport.use(
  new Strategy(
    {
      clientID: "1197782886049382483",
      clientSecret: "Iusedmypersonalkeysonotprovidingitinthecommitlol",
      callbackURL: "http://localhost:8000/login/discord/redirect",
      scope: ["identify", "guilds"],
    },
    async (accessToken, refreshToken, profile, done) => {
      if (profile) {
        console.log(profile);
      } else {
        console.log("No profile logged in!");
      }
    }
  )
);

module.exports = discordHandler;

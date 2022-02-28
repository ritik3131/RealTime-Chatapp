const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/userModel");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SCERET,
        callbackURL: "/login/google",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = new User({
          mailId: profile.emails[0].value,
          name: profile.displayName,
          image: profile.photos[0].value,
        });

        try {
          let user = await User.findOne({ mailId: profile.emails[0].value });
          if (user) done(null, user);
          else {
            await newUser.save();
            done(null, newUser);
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
      console.log("SerializeUser",user);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
      console.log("deSerializeUser",id);
      User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

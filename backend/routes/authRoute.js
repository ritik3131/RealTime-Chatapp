const express = require("express");
const passport = require("passport");

const router = express.Router();
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/login/google",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/404",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;

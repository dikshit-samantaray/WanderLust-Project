const express = require("express");
const router = express.Router();
const User = require("../models/userschema.js");
const asyncwrap = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router
  .route("/signup")
  .get(userController.rendersignUpForm)
  .post(asyncwrap(userController.signUp));

router
  .route("/login")
  .get(userController.renderloginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

router.get("/logout", userController.logout);

module.exports = router;

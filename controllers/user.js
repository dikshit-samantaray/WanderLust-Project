const User = require("../models/userschema.js");

module.exports.rendersignUpForm = (req, res) => {
  res.render("listings/users/signup.ejs");
};

module.exports.signUp = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next();
      }
      req.flash("success", "Welcome to WanderLust");
      res.redirect("/listings");
    });
    console.log(registeredUser);
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderloginForm = (req, res) => {
  res.render("listings/users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to WanderLust");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next();
    }
    req.flash("success", "You are logged out successfully");
    res.redirect("/listings");
  });
};

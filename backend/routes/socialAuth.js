const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

// GOOGLE START
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// GOOGLE CALLBACK
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${process.env.CLIENT_URL}/login` }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);

    res.redirect(`${process.env.CLIENT_URL}/social-success?token=${token}`);
  }
);

// GITHUB START
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

// GITHUB CALLBACK
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: `${process.env.CLIENT_URL}/login` }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);

    res.redirect(`${process.env.CLIENT_URL}/social-success?token=${token}`);
  }
);

module.exports = router;
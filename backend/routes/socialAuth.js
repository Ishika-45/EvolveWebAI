// routes/socialAuth.js
const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const isProduction = process.env.NODE_ENV === "production";

const createSocialUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  provider: user.provider,
});

const setSocialHandoffCookies = (res, token, user) => {
  const options = {
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    maxAge: 5 * 60 * 1000,
    path: "/api/auth",
  };

  res.cookie("social_auth_token", token, options);
  res.cookie(
    "social_auth_user",
    Buffer.from(JSON.stringify(createSocialUser(user))).toString("base64url"),
    options
  );
};

// GOOGLE START
router.get("/google", 
  passport.authenticate("google", { 
    scope: ["profile", "email"],
    accessType: 'offline'
  })
);

// GOOGLE CALLBACK
router.get(
  "/google/callback",
  (req, res, next) => {
    console.log("Google callback received");
    next();
  },
  passport.authenticate("google", { 
    failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed`,
  }),
  (req, res) => {
    try {
      console.log("Google auth successful for user:", req.user.email);
      
      // Create token
      const token = jwt.sign(
        { id: req.user._id }, 
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );
      
      setSocialHandoffCookies(res, token, req.user);

      // The token is exchanged once through an HttpOnly handoff cookie rather
      // than being exposed in the redirect URL, history, or referrer.
      res.redirect(`${process.env.CLIENT_URL}/social-success`);
    } catch (error) {
      console.error("Token error:", error);
      res.redirect(`${process.env.CLIENT_URL}/login?error=token_error`);
    }
  }
);

// GITHUB START
router.get("/github", 
  passport.authenticate("github", { 
    scope: ["user:email"]
  })
);

// GITHUB CALLBACK
router.get(
  "/github/callback",
  (req, res, next) => {
    console.log("GitHub callback received");
    next();
  },
  passport.authenticate("github", { 
    failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed`,
  }),
  (req, res) => {
    try {
      console.log("GitHub auth successful for user:", req.user.email);
      
      // Create token
      const token = jwt.sign(
        { id: req.user._id }, 
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );
      
      setSocialHandoffCookies(res, token, req.user);

      // The token is exchanged once through an HttpOnly handoff cookie rather
      // than being exposed in the redirect URL, history, or referrer.
      res.redirect(`${process.env.CLIENT_URL}/social-success`);
    } catch (error) {
      console.error("Token error:", error);
      res.redirect(`${process.env.CLIENT_URL}/login?error=token_error`);
    }
  }
);

module.exports = router;

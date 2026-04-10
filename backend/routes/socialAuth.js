// routes/socialAuth.js
const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

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
      
      // Encode user data for URL
      const userData = encodeURIComponent(JSON.stringify({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        provider: req.user.provider
      }));
      
      // Redirect with both token and user data
      res.redirect(`${process.env.CLIENT_URL}/social-success?token=${token}&user=${userData}`);
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
      
      // Encode user data for URL
      const userData = encodeURIComponent(JSON.stringify({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        provider: req.user.provider
      }));
      
      // Redirect with both token and user data
      res.redirect(`${process.env.CLIENT_URL}/social-success?token=${token}&user=${userData}`);
    } catch (error) {
      console.error("Token error:", error);
      res.redirect(`${process.env.CLIENT_URL}/login?error=token_error`);
    }
  }
);

module.exports = router;
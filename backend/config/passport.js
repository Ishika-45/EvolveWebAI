const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");

passport.serializeUser((user, done) => {
  console.log("Serializing user:", user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log("Deserializing user:", user?.email);
    done(null, user);
  } catch (error) {
    console.error("Deserialize error:", error);
    done(error, null);
  }
});

// GOOGLE LOGIN
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google profile received:", profile.id);
        
        if (!profile.emails || profile.emails.length === 0) {
          console.error("No email found in Google profile");
          return done(new Error("No email found from Google"), null);
        }
        
        const email = profile.emails[0].value;
        console.log("Google email:", email);
        
        let user = await User.findOne({ email });
        
        if (!user) {
          console.log("Creating new user for Google:", email);
          user = await User.create({
            name: profile.displayName || profile.name?.givenName + " " + profile.name?.familyName,
            email,
            password: null,
            provider: "google",
          });
        } else {
          console.log("Existing user found for Google:", email);
          if (user.provider !== "google") {
            user.provider = "google";
            await user.save();
          }
        }
        
        return done(null, user);
      } catch (error) {
        console.error("Google strategy error:", error);
        return done(error, null);
      }
    }
  )
);

// GITHUB LOGIN
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_REDIRECT_URL,
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("GitHub profile received:", profile.id);
        
        let email = null;
        
        if (profile.emails && profile.emails.length > 0) {
          email = profile.emails[0].value;
          console.log("Email from profile:", email);
        } else {
          try {
            const fetch = require('node-fetch');
            const emailResponse = await fetch('https://api.github.com/user/emails', {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'User-Agent': 'EvolveWebAI',
              },
            });
            const emails = await emailResponse.json();
            
            if (emails && emails.length > 0) {
              const primaryEmail = emails.find(email => email.primary === true);
              email = primaryEmail ? primaryEmail.email : emails[0].email;
              console.log("Found email via API:", email);
            } else {
              email = `${profile.username}@github.com`;
              console.log("Using fallback email:", email);
            }
          } catch (apiError) {
            console.error("Error fetching GitHub emails:", apiError);
            email = `${profile.username}@github.com`;
          }
        }
        
        if (!email) {
          return done(new Error("No email found from GitHub"), null);
        }
        
        let user = await User.findOne({ email });
        
        if (!user) {
          console.log("Creating new user for GitHub:", email);
          user = await User.create({
            name: profile.displayName || profile.username,
            email,
            password: null,
            provider: "github",
          });
        } else {
          console.log("Existing user found for GitHub:", email);
          if (user.provider !== "github") {
            user.provider = "github";
            await user.save();
          }
        }
        
        return done(null, user);
      } catch (error) {
        console.error("GitHub strategy error:", error);
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
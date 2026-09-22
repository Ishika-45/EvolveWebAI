const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const getCookieValue = (req, name) => {
  const cookies = req.headers.cookie || "";
  const prefix = `${name}=`;

  const entry = cookies
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(prefix));

  return entry ? decodeURIComponent(entry.slice(prefix.length)) : "";
};

const socialCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/api/auth",
};

// 🔑 Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Exchanges the short-lived, HttpOnly social-login handoff cookies created by
// the OAuth callback. This preserves the app's existing local-storage token
// contract without putting a JWT in the redirect URL.
router.get("/social-session", (req, res) => {
  const token = getCookieValue(req, "social_auth_token");
  const encodedUser = getCookieValue(req, "social_auth_user");

  res.clearCookie("social_auth_token", socialCookieOptions);
  res.clearCookie("social_auth_user", socialCookieOptions);

  if (!token || !encodedUser) {
    return res.status(401).json({ message: "Social login session not found" });
  }

  try {
    const user = JSON.parse(
      Buffer.from(encodedUser, "base64url").toString("utf8")
    );

    return res.json({ token, user });
  } catch (error) {
    return res.status(400).json({ message: "Social login session is invalid" });
  }
});

// 📝 REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// 🔐 LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

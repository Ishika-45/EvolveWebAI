// server.js - Make sure session config is correct
const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const aiRoutes = require("./routes/ai");
const passport = require("./config/passport");
const { protect } = require("./middleware/authMiddleware");

connectDB();

const app = express();

// CORS - Must allow credentials
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// Session configuration - IMPORTANT: secure should be false for localhost
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,  // MUST be false for localhost (HTTP)
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/ai", aiRoutes);
app.use("/auth", require("./routes/socialAuth"));

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("EvolveWeb AI Backend Running...");
});

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Google OAuth URL: http://localhost:${PORT}/auth/google`);
  console.log(`GitHub OAuth URL: http://localhost:${PORT}/auth/github`);
});
require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
dotenv.config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const requestsRoutes = require("./routes/request");
const announcementRoutes = require("./routes/announcements"); // Add this line
const configurePassport = require("./config/passport");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

// Passport initialization
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/users", authRoutes);
app.use("/requests", requestsRoutes);
app.use("/routes/announcements", announcementRoutes); // Add this line

// DB connect and start server
connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

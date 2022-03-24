const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

// Import Routes
const usersRoute = require("./routes/api/users");
const authRoute = require("./routes/api/auth");
const decksRoute = require("./routes/api/decks");
const flashcardsRoute = require("./routes/api/flashcards");

const app = express();
// app.get("/", (req, res) => res.send("API RUNNING"));

// Connect Database;
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Connect Routes
app.use("/api/users", usersRoute);
app.use("/api/decks", decksRoute);
app.use("/api/auth", authRoute);
app.use("/api/flashcards", flashcardsRoute);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Run
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
const PORT = 8000;

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/notes", noteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
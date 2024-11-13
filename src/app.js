require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const models = require("./models/modelsUtils/relations/relations");
const sequelize = require("./config/dbConnect");
const router = require("./routers/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const corsConfig = {
  origin: process.env.CLIENT_SERVER, // Ensure this is dynamically configurable in production
  credentials: true, // Allows cookies to be sent
};

const PORT = process.env.PORT || 3030; // Use 3030 as a fallback if no environment variable is provided

const app = express();

// Middlewares
app.use(cors(corsConfig)); // Enabling CORS for local frontend
app.use(express.json()); // Middleware to parse JSON requests
app.use(express.static(path.resolve(__dirname, "static"))); // Serve static files from the 'static' directory
app.use(fileUpload({})); // Enable file uploads

// API Routes
app.use("/api", router);

// Error handling middleware should be at the end of all middlewares
app.use(errorHandler);

const start = async () => {
  try {
    // Validate required environment variables
    // if (!process.env.DATABASE_URL) {
    //     throw new Error("DATABASE_URL is missing in environment variables");
    // }

    // Establish a connection to the database
    await sequelize.authenticate();
    await sequelize.sync(); // Sync models with the database

    // Start the server
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    // Improved error handling: log the error and exit the process if critical
    console.error("Error starting server:", error.message);
    process.exit(1); // Exit the process to prevent the server from running in an invalid state
  }
};

start();

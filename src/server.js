import "dotenv/config";
import express from "express";
import { connectDB, disconnectDB } from "./config/db.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

await connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// concell from  the terminal
process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down...");
  server.close();
  await disconnectDB(0);
});

// Hosting platforms send this to stop the app
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down...");
  server.close();
  await disconnectDB(0);
});

// A promise failed and nobody caught the error
process.on("unhandledRejection", async (err) => {
  console.error("Unhandled rejection:", err);
  server.close();
  await disconnectDB(1);
});

// An error was thrown outside any try/catch
process.on("uncaughtException", async (err) => {
  console.error("Uncaught exception:", err);
  server.close();
  await disconnectDB(1);
});
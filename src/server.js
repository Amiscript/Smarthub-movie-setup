import express from "express.js";
import dotenv from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";




dotenv.config();
connectDB()
const app = express();
app.listen(process.env.PORT , () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});



disconnectDB()

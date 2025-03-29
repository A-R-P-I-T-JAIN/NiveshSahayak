import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./DataBase/connectDB.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB()
  .then(() => {
    console.log("Connected to MongoDB form index.js");
    app.listen(4000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => {
    console.log("Unable to connect to MongoDB form index.js", err.message);
  });

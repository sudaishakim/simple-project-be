import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

// init express app
const app = express();

//routes
import postRoutes from "./routes/posts.js";

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

// connect to mongodb
const CONNECTION_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.qgsml.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on Port : ${PORT}`))
  )
  .catch((err) => console.log(err.message));

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import topicRoutes from "./routes/topics.js";
import pageRoutes from "./routes/pages.js";
import logger from "morgan";
import dotenv from 'dotenv'

const app = express();
dotenv.config();

app.use(logger("dev"));
app.use(express.json({ limit: "30mb", extend: true }));
app.use(express.urlencoded({ limit: "30mb", extend: true }));
app.use(cors());
app.use("/posts", postRoutes);
app.use("/topics", topicRoutes);
app.use("/comments", commentRoutes);
app.use("/uploads", express.static("../uploads"), pageRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(`${error}`));

mongoose.set("useFindAndModify", false);

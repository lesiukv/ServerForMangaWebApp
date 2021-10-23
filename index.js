import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments";
import topicRoutes from "./routes/topics";
import pageRoutes from "./routes/pages";

const app = express();

app.use(express.json({ limit: "30mb", extend: true }));
app.use(express.urlencoded({ limit: "30mb", extend: true }));
app.use(cors());
app.use("/posts", postRoutes);
app.use("/topics", topicRoutes);
app.use("/comments", commentRoutes);
app.use("/uploads", express.static("../uploads"), pageRoutes);

const CONNECTION_URL =
  "mongodb+srv://pan_kit:12341234@cluster0.u6uy1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error));

mongoose.set("useFindAndModify", false);

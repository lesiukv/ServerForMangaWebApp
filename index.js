import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import topicRoutes from "./routes/topics.js";
import pageRoutes from "./routes/pages.js";
import userRoutes from "./routes/users.js";
import favoriteRouter from "./routes/favorites.js";
import logger from "morgan";
import dotenv from "dotenv";
import passport from "passport";
import path from "path";

const app = express();
dotenv.config();

const __dirname = path.resolve();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json({ limit: "30mb", extend: true }));
app.use(express.urlencoded({ limit: "30mb", extend: true }));
app.use(cors());

app.use(passport.initialize());

app.use("/posts", postRoutes);
app.use("/topics", topicRoutes);
app.use("/comments", commentRoutes);
app.use("/uploads", express.static("../uploads"), pageRoutes);
app.use("/users", userRoutes);
app.use("/favorite", favoriteRouter);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(`${error}`));

app.use((req, res, next) => {
  next(createError(404));
});

// app.use((err, req, res, next) => {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   res.status(err.status || 500);
//   res.render("error");
// });

mongoose.set("useFindAndModify", false);

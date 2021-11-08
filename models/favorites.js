import mongoose from "mongoose";

const Favorite = mongoose.Schema({
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "postMessage",
    },
  ],
  user: { type: mongoose.Types.ObjectId, ref: "Users" },
});

const Favorites = mongoose.model("Favorites", Favorite);
export default Favorites;

import mongoose from "mongoose";

const Comment = mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
      default: "",
    },
  },
  { timestamp: true }
);

const Comments = mongoose.model("Comment", Comment);

export default Comments;

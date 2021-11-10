import mongoose from "mongoose";

const Comment = mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    comment: {
      type: String,
      default: "",
    },
    post: { type: mongoose.Types.ObjectId, ref: "postMessage" },
  },
  { timestamp: true }
);

const Comments = mongoose.model("Comment", Comment);

export default Comments;

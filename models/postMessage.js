import mongoose from "mongoose";

const postComment = mongoose.Schema({
  author: String,
  comment: String,
  createdAt: {
    type: Date,
    default: new Date()
  },
  likeCount: {
    type: Number,
    default: 0
  }
})

const postSchema = mongoose.Schema({
  title: String,
  parodie: String,
  tags: [String],
  artists: [String],
  group: String,
  language: String,
  category: String,
  characters: [String],
  pages: [{
    dest: String,
  }],
  likeCount: {
    type: Number,
    default: 0,
  },
  comments: [postComment],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const postMessage = mongoose.model("postMessage", postSchema);

export default postMessage;

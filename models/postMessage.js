import mongoose from "mongoose";

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
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  comments: {
    type: mongoose.Types.ObjectId,
    ref: 'Comment',
  }
}, { timestamp: true });

const postMessage = mongoose.model("postMessage", postSchema);

export default postMessage;

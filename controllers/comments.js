import Comments from "../models/Comments.js";

export const getComments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comments = await Comments.find({ post: id }).populate("author");
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const getComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await Comments.findById(commentId);
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comments.create({ ...req.body, post: id });
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const deleteComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    await Comments.deleteMany({ post: postId });
    res.status(200).json("Comments removed successfully");
  } catch (error) {
    next(error);
  }
};

const isThisAccount = async (userId, commentId) => {
  const comment = Comments.findById(commentId);
  return comment.author === userId;
};

export const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    if (isThisAccount(req.user._id, commentId)) {
      await Comments.findByIdAndDelete(commentId);
      res.status(200).json("Comment removed successfully");
    } else {
      res.status(403).json("You are not allowed to delete this comment");
    }
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const updatedComment = req.body;
    if (isThisAccount(req.user._id == commentId)) {
      const comment = await Comments.findByIdAndUpdate(
        commentId,
        updatedComment
      );
      res.status(200).json(comment);
    } else {
      res.status(403).json("You are not allowed to update this comment");
    }
  } catch (error) {
    next(error);
  }
};

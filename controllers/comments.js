import postMessage from "../models/postMessage.js";
import Comments from "../models/Comments.js";

export const getComments = async (req, res, netx) => {
  try {
    const { id } = req.params;
    const comments = await Comments.find({ post: id })
      .populate("author")
    console.log(comments);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const getComment = async (req, res, next) => {
  try {
    const { id, commentId } = req.params;
    const comment = await postMessage.findById(id).then((post) => {
      return post.comments.id(commentId);
    });
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comments.create({ ...req.body, post: id });
    console.log(comment);
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const deleteComments = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postMessage.findById(id);

    for (let i = 0; i < post.comments.length; i++) {
      post.comments.id(post.comments[i]._id).remove();
    }

    await postMessage.findByIdAndUpdate(id, post);

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { id, commentId } = req.params;
    await postMessage.findById(id).then((post) => {
      post.comments.id(commentId).remove();
      post.save().then(() => {
        res.status(200).json("Comment Deleted");
      });
    });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const { id, commentId } = req.params;
    const updatedComment = req.body;
    const post = await postMessage.findById(id);

    post.comments.id(commentId).author = updatedComment.author;
    post.comments.id(commentId).comment = updatedComment.comment;

    await postMessage.findByIdAndUpdate(id, post);

    res.json(post.comments.id(commentId));
  } catch (error) {
    next(error);
  }
};

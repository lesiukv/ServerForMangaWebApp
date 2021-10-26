import postMessage from "../models/postMessage.js";

export const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const { comments } = await postMessage.findById(id);
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json(`${error}`);
  }
};

export const getComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const { comments } = await postMessage.findById(id);
    const comment = comments.find((comment) => comment._id === commentId);
    res.status(200).json(comment);
  } catch (error) {
    res.status(404).json(`${error}`);
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    let post = await postMessage.findById(id);
    post.comments.unshift(req.body);
    await postMessage.findByIdAndUpdate(id, post);
    res.status(200).json(req.body);
  } catch (error) {
    res.json(`${error}`);
  }
};

export const deleteComments = async (req, res) => {
  try {
    const { id } = req.params;
    let post = await postMessage.findById(id);

    for (let i = 0; i < post.comments.length; i++) {
      post.comments.id(post.comments[i]._id).remove();
    }

    await postMessage.findByIdAndUpdate(id, post);

    res.status(200).json(post);
  } catch (error) {
    res.json(`${error}`);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    await postMessage.findById(id).then((post) => {
      post.comments.id(commentId).remove();
      post.save().then(() => {
        res.status(200).json("Comment Deleted");
      });
    });
  } catch (error) {
    res.json(`${error}`);
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const updatedComment = req.body;
    const post = await postMessage.findById(id);

    await postMessage.findByIdAndUpdate(
      id,
      post.comments.map((comment) => {
        if (comment._id === commentId) {
          comment.author = updatedComment.author;
          comment.comment = updatedComment.comment;
          return comment;
        } else return comment;
      })
    );
    res.json(updatedComment);
  } catch (error) {
    res.json(`${error}`);
  }
};

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
    post.comments.push(req.body);
    await postMessage.findByIdAndUpdate(id, post);
    res.status(200).json(post);
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
    let post = await postMessage.findById(id);
    await postMessage.findByIdAndUpdate(
      id,
      post.comments.filter((comment) => comment._id != commentId)
    );
  } catch (error) {
    res.json(`${error}`);
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id, commentId} = req.params;
    const updatedComment = req.body;
    let post = await postMessage.findById(id);
    post.comments = updatedComment;
    await postMessage.findByIdAndUpdate(id, post);
  } catch (error) {
    res.json(`${error}`);
  }
}
import postMessage from "../models/postMessage";

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

export const deleteComments = async (req, res) => {
    try {
        const { id } = req.params;
        const 
    } catch (error) {
        res.json(`${error}`);
    }
}
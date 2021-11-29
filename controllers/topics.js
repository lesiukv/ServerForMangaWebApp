import postMessage from "../models/postMessage.js";

export const getTopic = async (req, res, next) => {
  try {
    const { topic } = req.params;
    const posts = await postMessage.find();
    const postsValues = [];
    const countArray = [];

    for (const post of posts) {
      postsValues.push(...post[topic]);
    }

    for (const value of postsValues) {
      countArray.push(
        await postMessage.find({ [topic]: { $in: value } }).count()
      );
    }

    res.status(200).json([postsValues, countArray]);
  } catch (error) {
    next(error);
  }
};

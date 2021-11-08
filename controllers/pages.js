import postMessage from "../models/postMessage.js";

export const postPages = (req, res, next) => {
  try {
    console.log("Page Posted");
    res.status(200).json("Page Posted");
  } catch (error) {
    next(error);
  }
};

export const getPages = (req, res, next) => {
  try {
    const { pages } = postMessage.findById(req.params);
    res.status(200).json(pages);
  } catch (error) {
    next(error);
  }
}
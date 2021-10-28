import postMessage from "../models/postMessage.js";

export const postPages = (req, res) => {
  try {
    res.status(200).json("Page Uploaded")
  } catch (error) {
    console.log(`${error}`);
  }
};

export const getPages = (req, res) => {
  try {
    const { pages } = postMessage.findById(req.params);
    res.status(200).json(pages);
  } catch (error) {
    console.log(`${error}`);
  }
}
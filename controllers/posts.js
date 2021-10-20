import postMessage from "../models/postMessage.js";
import { getTopicsNumber } from "../logic/topics.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await postMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json(`${error}`);
  }
};

export const getPostDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const postMessageDetails = await postMessage.findById(id);
    const postMessages = await postMessage.find();
    let detailsArray = [];

    detailsArray.push(postMessageDetails);
    detailsArray.push(getTopicsNumber(postMessageDetails.toJSON(), postMessages))

    res.status(200).json(detailsArray);
  } catch (error) {
    res.status(404).json(`${error}`);
  }
};

export const createPost = async (req, res) => {
  let {
    title,
    parodie,
    tags,
    artists,
    group,
    language,
    category,
    characters,
    pages,
  } = req.body;

  const newPostMessage = new postMessage({
    title,
    parodie,
    tags,
    artists,
    group,
    language,
    category,
    characters,
    pages,
  });

  try {
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json(`${error}`);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await postMessage.findByIdAndDelete(id);
    res.json("Post successfully deleted");
  } catch (error) {
    res.status(404).json(`${error}`);
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedPost = await postMessage.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(404).json(`${error}`);
  }
};

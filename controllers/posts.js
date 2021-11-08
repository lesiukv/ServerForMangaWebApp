import postMessage from "../models/postMessage.js";
import { getTopicsNumber } from "../logic/topics.js";

export const getPosts = async (req, res, next) => {
  try {
    const postMessages = await postMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    next(error);
  }
};

export const getPostDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const postMessageDetails = await postMessage.findById(id);
    const postMessages = await postMessage.find();
    const detailsArray = [];

    detailsArray.push(postMessageDetails);
    detailsArray.push(
      getTopicsNumber(postMessageDetails.toJSON(), postMessages)
    );

    res.status(200).json(detailsArray);
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
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
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    await postMessage.findByIdAndDelete(id);
    res.json("Post successfully deleted");
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedPost = await postMessage.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
};

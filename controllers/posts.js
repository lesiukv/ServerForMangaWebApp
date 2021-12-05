import postMessage from "../models/postMessage.js";
import fs from "fs";

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

    const postDetails = await postMessage.findById(id);
    const countObject = {};

    const postDetailsKeys = [
      "title",
      "parodie",
      "tags",
      "artists",
      "group",
      "language",
      "category",
      "characters",
    ];

    for (const topic of postDetailsKeys) {
      countObject[topic] = [];

      for (const value of postDetails[topic]) {
        countObject[topic].push(
          await postMessage.find({ [topic]: { $in: value } }).count()
        );
      }
    }

    res.status(200).json([postDetails, countObject]);
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
    const { pages } = await postMessage.findById(id);

    for (const page of pages) {
      fs.unlinkSync(`../uploads/${page.dest}`);
    }

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

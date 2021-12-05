import postMessage from "../models/postMessage.js";
import fs from "fs";

export const postPages = (req, res, next) => {
  try {
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
};

export const removePage = async (req, res, next) => {
  try {
    const { pageId } = req.params;
    fs.unlinkSync(`../uploads/${pageId}`);
    res.status(200).json(`Pages #${pageId} successfully removed`);
  } catch (error) {
    next(error);
  }
};

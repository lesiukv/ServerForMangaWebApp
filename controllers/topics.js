import postMessage from "../models/postMessage.js";
import { getTopicsNumber } from "../logic/topics.js";

export const getTopic = async (req, res, next) => {
  try {
    const { topic } = req.params;
    const postMessages = await postMessage.find();
    const tempUniqueValuesOfTopics = {};
    const uniqueValuesOfTopics = {};
    const topicsArray = [];

    tempUniqueValuesOfTopics[topic] = [
      ...new Set(postMessages.map((post) => post[topic])),
    ];

    uniqueValuesOfTopics[topic] = [].concat(...tempUniqueValuesOfTopics[topic]);
    uniqueValuesOfTopics[topic] = uniqueValuesOfTopics[topic].filter(
      (element) => element != ""
    );

    topicsArray.push(uniqueValuesOfTopics);
    topicsArray.push(getTopicsNumber(uniqueValuesOfTopics, postMessages));

    res.status(200).json(topicsArray);
  } catch (error) {
    next(error);
  }
};

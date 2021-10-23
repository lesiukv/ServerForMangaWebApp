import postMessage from "../models/postMessage.js";
import { getTopicsNumber } from "../logic/topics.js";


export const getTopic = async (req, res) => {
  try {
    const { topic } = req.params;
    const postMessages = await postMessage.find();
    let tempUniqueValuesOfTopics = {};
    let uniqueValuesOfTopics = {};
    let topicsArray = [];

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
    res.status(404).json(`${error}`);
  }
};
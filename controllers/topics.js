import postMessage from "../models/postMessage.js";

export const getTopics = async (req, res) => {
  try {
    const postMessages = await postMessage.find();
    const arrayOfTopics = Object.keys(postMessages[0].toJSON());
    let uniqueValuesOfTopics = {};
    let newUniqueValuesOfTopics = {};

    arrayOfTopics.forEach((topic) => {
      uniqueValuesOfTopics[topic] = [
        ...new Set(postMessages.map((post) => post[topic])),
      ];
      newUniqueValuesOfTopics[topic] = [].concat(
        ...uniqueValuesOfTopics[topic]
      );
      newUniqueValuesOfTopics[topic] = newUniqueValuesOfTopics[topic].filter(
        (element) => element != ""
      );
    });

    res.status(200).json(newUniqueValuesOfTopics);
  } catch (error) {
    res.status(404).json(`${error}`);
  }
};

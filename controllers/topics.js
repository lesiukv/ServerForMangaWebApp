import postMessage from "../models/postMessage.js";

export const getTopics = async (req, res) => {
  try {
    const { topic } = req.params;
    const postMessages = await postMessage.find();
    let uniqueValuesOfTopics = {};
    let newUniqueValuesOfTopics = {};

    uniqueValuesOfTopics[topic] = [
      ...new Set(postMessages.map((post) => post[topic])),
    ];

    newUniqueValuesOfTopics[topic] = [].concat(...uniqueValuesOfTopics[topic]);
    newUniqueValuesOfTopics[topic] = newUniqueValuesOfTopics[topic].filter(
      (element) => element != ""
    );

    res.status(200).json(newUniqueValuesOfTopics);
  } catch (error) {
    res.status(404).json(`${error}`);
  }
};

export const getTopicsNumber = async (req, res) => {
  try {
    const topic = req.body;
    

  } catch (error) {
    res.json(`${error}`);
  }
}

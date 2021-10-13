import postMessage from "../models/postMessage.js";

export const getTopics = async (req, res) => {
    try {
      const postMessages = await postMessage.find();
      const arrayOfTopics = Object.keys(postMessages[0].toJSON());
      const uniqueValuesOfTopics = {};
  
      arrayOfTopics.forEach((topic) => {
        uniqueValuesOfTopics[topic] = [
          ...new Set(postMessages.map((post) => post[topic])),
        ];
      });
  
      res.status(200).json(uniqueValuesOfTopics);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  };
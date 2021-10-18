import postMessage from "../models/postMessage.js";

export const getTopics = async (req, res) => {
  try {
    const { topic } = req.params;
    const postMessages = await postMessage.find();
    let tempUniqueValuesOfTopics = {};
    let uniqueValuesOfTopics = {};

    tempUniqueValuesOfTopics[topic] = [
      ...new Set(postMessages.map((post) => post[topic])),
    ];

    uniqueValuesOfTopics[topic] = [].concat(...tempUniqueValuesOfTopics[topic]);
    uniqueValuesOfTopics[topic] = uniqueValuesOfTopics[topic].filter(
      (element) => element != ""
    );

    res.status(200).json(uniqueValuesOfTopics);
  } catch (error) {
    res.status(404).json(`${error}`);
  }
};

const countTopics = (value, postMessages, topic) => {
  let topicsNumber = 0;
  console.log("countTopics", value, topic)
  postMessages.forEach((element) => {
    if (Array.isArray(element[topic])) {
      element[topic].forEach((subElement) => {
        if (value == subElement) topicsNumber++;
      });
    } else {
      if (value == element[topic]) topicsNumber++;
    }
  });

  return topicsNumber;
};


export const getTopicsNumber = async (req, res) => {
  try {
    const topic = req.body;

    console.log("reqblya",req);

    const postMessages = await postMessage.find();
    let topicsNumber = {};

    Object.keys(topic).map((key, index) => {
      topicsNumber[topic] = [];

      if (Array.isArray(topic[key])) {
        topic[key].forEach((element) => {
          topicsNumber[topic].push(countTopics(element, postMessages, key));
        });
      } else {
        topicsNumber[topic].push(countTopics(topic[key], postMessages, key));
      }
    });

    res.json(topicsNumber);
  } catch (error) {
    res.json(`${error}`);
  }
};

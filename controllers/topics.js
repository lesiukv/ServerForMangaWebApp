import postMessage from "../models/postMessage.js";

const countTopics = (value, postMessages, topic) => {
  let topicsNumber = 0;
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

const getTopicsNumber = (topic, postMessages) => {
  let topicsNumber = {};
  Object.keys(topic).map((key, index) => {
    topicsNumber[key] = [];

    if (Array.isArray(topic[key])) {
      topic[key].forEach((element) => {
        topicsNumber[key].push(countTopics(element, postMessages, key));
      });
    } else {
      topicsNumber[key].push(countTopics(topic[key], postMessages, key));
    }
  });

  return topicsNumber;
};

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

export const getPostDetailsTopics = async (req, res) => {
  try {
    const topics = req.body;
    const postMessages = await postMessage.find();
    const postDetailsTopics = getTopicsNumber(topics, postMessages);

    res.status(200).json(postDetailsTopics);
  } catch (error) {
    res.status(404).json(`${error}`);
  }
}

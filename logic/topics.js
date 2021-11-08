export const countTopics = (value, postMessages, topic) => {
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
  
export const getTopicsNumber = (topic, postMessages) => {
    const topicsNumber = {};
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
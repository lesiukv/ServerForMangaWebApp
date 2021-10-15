export const postPages = (req, res) => {
  try {
    res.status(201).json({ message: "SUCCESS" });
  } catch (error) {
    res.status(409).json({ message: error });
  }
  res.send({ status: "SUCCESS" });
};

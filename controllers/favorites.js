import Users from "../models/Users";

export const getUsers = async (req, res, next) => {
  try {
    const getUsers = await Users.find();
    res.status(200).json(getUsers);
  } catch (error) {
    next(error);
  }
};



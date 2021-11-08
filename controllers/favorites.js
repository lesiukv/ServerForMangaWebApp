import Users from "../models/Users";
import Favorites from "../models/Favorites";

export const getFavoritesList = async (req, res, next) => {
  try {
    const getFavorite = await Favorites.find({ _id: req.user._id })
      .populate("posts")
      .populate("user");
    res.status(200).json(getFavorite);
  } catch (error) {
    next(error);
  }
};


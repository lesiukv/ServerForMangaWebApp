import Favorites from "../models/favorites.js";

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

export const addFavorite = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;
    const isFavoriteListExists = await Favorites.findOne({
      user: req.user._id,
    });

    if (isFavoriteListExists?.user.toString() == userId.toString) {
      Favorites.findOne({ user: userId }).then((favorite) => {
        favorite.posts.push(postId);
        favorite.save();
        res.status(200).json(favorite);
      });
    } else {
      const favorite = await Favorites.create({
        user: userId,
        posts: [postId],
      });
      res.status(200).json(favorite);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteFavorite = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    await Favorites.findOne({ user: userId }).then((favorite) => {
      const index = favorite.posts.indexOf(postId);
      if (index > -1) {
        favorite.splice(index, 1);
      }
      favorite.save();
    });

    res.status(200).json(`Post #${postId} removed successfully`);
  } catch (error) {
    next(error);
  }
};

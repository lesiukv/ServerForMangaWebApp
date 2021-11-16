import express from "express";
import {
  getFavoritesList,
  addFavorite,
  deleteFavorite,
} from "../controllers/favorites.js";
import { verifyUser, verifyAdmin } from "../authenticate.js";

const router = express.Router();

router.get("/", verifyUser, getFavoritesList);
router.post("/:postId", verifyUser, addFavorite);
router.delete("/:postId", verifyUser, deleteFavorite);

export default router;

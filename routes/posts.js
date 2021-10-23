import express from "express";
import {
  getPosts,
  createPost,
  getPostDetails,
  deletePost,
  updatePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostDetails);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.patch("/:id", updatePost);

export default router;

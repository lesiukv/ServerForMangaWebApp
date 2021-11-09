import express from "express";
import {
  getPosts,
  createPost,
  getPostDetails,
  deletePost,
  updatePost,
} from "../controllers/posts.js";
import { verifyAdmin } from "../authenticate.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostDetails);
router.post("/", verifyAdmin, createPost);
router.delete("/:id", verifyAdmin, deletePost);
router.patch("/:id", verifyAdmin, updatePost);

export default router;

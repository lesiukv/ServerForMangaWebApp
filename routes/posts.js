import express from "express";
import {
  getPosts,
  createPost,
  getPostDetails,
  deletePost,
  updatePost,
} from "../controllers/posts.js";
import { postPages } from "../controllers/pages.js";
import { getTopics, getTopicsNumber } from "../controllers/topics.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/topics/:topic", getTopics);
router.post("/", createPost);
router.post("/uploads", upload.array("page"), postPages);
router.get("/:id", getPostDetails);
router.delete("/:id", deletePost);
router.get("/topics/amount", getTopicsNumber);
router.patch("/:id", updatePost);

export default router;

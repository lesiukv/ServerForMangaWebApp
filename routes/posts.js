import express from "express";
import {
  getPosts,
  createPost,
  getPostDetails,
  deletePost,
  updatePost,
} from "../controllers/posts.js";
import { postPages } from "../controllers/pages.js";
import { getTopics } from "../controllers/topics.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/topics", getTopics);
router.post("/", createPost);
router.post("/uploads", upload.array("page"), postPages);
router.get("/:id", getPostDetails);
router.delete("/:id", deletePost);
router.patch("/:id", updatePost);

export default router;

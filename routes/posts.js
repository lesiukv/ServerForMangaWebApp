import express from "express";
import {
  getPosts,
  createPost,
  getPostDetails,
  deletePost,
  updatePost,
} from "../controllers/posts.js";
import { postPages } from "../controllers/pages.js";
import { getTopic, getPostDetailsTopics } from "../controllers/topics.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
// router.get("/:id", getPostDetails);
router.delete("/:id", deletePost);
router.patch("/:id", updatePost);

router.get("/topics/:topic", getTopic);
router.patch("/topics/postDetails", getPostDetailsTopics)

router.post("/uploads", upload.array("page"), postPages);

export default router;

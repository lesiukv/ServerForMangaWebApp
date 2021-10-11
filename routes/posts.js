import express from "express";
import {
  getPosts,
  createPost,
  getPostDetails,
  deletePost,
  updatePost,
} from "../controllers/posts.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.post("/uploads", upload.array('page'));
router.get("/:id", getPostDetails);
router.delete("/:id", deletePost);
router.patch("/:id", updatePost);

export default router;

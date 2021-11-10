import {
  getComments,
  getComment,
  addComment,
  deleteComments,
  deleteComment,
  updateComment,
} from "../controllers/comments.js";
import express from "express";
import { verifyUser, verifyAdmin } from "../authenticate.js";

const router = express.Router();

router.get("/:id", getComments);
router.get("/:commentId", verifyUser, getComment);
router.post("/:id", verifyUser, addComment);
router.delete("/deleteAll/:postId/", verifyAdmin, deleteComments);
router.delete("/:commentId", verifyUser, deleteComment);
router.patch("/:commentId", verifyUser, updateComment);

export default router;
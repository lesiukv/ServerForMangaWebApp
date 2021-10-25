import {
  getComments,
  getComment,
  addComment,
  deleteComments,
  deleteComment,
  updateComment,
} from "../controllers/comments.js";
import express from "express";

const router = express.Router();

router.get("/:id", getComments);
router.get("/:id/:commentId", getComment);
router.post("/:id", addComment);
router.delete("/:id/", deleteComments);
router.delete(":id/:commentId", deleteComment);
router.patch("/:id/:commentId", updateComment);

export default router;
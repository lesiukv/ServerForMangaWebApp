import {
  getComments,
  getComment,
  addComment,
  deleteComments,
  deleteComment,
  updateComment,
} from "../controllers/comments.js";
import express from "express";
import { verifyUser } from "../authenticate.js";

const router = express.Router();

router.get("/:id", verifyUser, getComments);
router.get("/:id/:commentId", verifyUser, getComment);
router.post("/:id", verifyUser, addComment);
router.delete("/:id/", verifyUser, deleteComments);
router.delete("/:id/:commentId", verifyUser, deleteComment);
router.patch("/:id/:commentId", verifyUser, updateComment);

export default router;
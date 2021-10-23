import {
  getComments,
  getComment,
  addComment,
  deleteComments,
  deleteComment,
  updateComment,
} from "../controllers/comments.js";

const router = express.Router();

router.get("/:id/", getComments);
router.get("/:id/:commentId", getComment);
router.patch("/:id/", addComment);
router.delete("/:id/", deleteComments);
router.delete(":id/:commentId", deleteComment);
router.patch("/:id/:commentId", updateComment);

export default router;
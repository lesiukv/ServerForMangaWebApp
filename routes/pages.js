import express from "express";
import { getPages, postPages } from "../controllers/pages.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.get("/:postId", getPages);
router.post("/", upload.array("page"), postPages);

export default router;

import express from "express";
import { getPages, postPages, removePage } from "../controllers/pages.js";
import { upload } from "../middleware/multer.js";
import { verifyAdmin } from "../authenticate.js";

const router = express.Router();

router.get("/:postId", getPages);
router.delete("/:pageId", removePage);
router.post("/", verifyAdmin, upload.single("page"), postPages);

export default router;

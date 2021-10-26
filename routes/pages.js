import express from "express";
import { postPages } from "../controllers/pages.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/", upload.array("page"), postPages);

export default router;

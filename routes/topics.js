import express from "express";
import { getTopic } from "../controllers/topics.js";

const router = express.Router();

router.get("/:topic", getTopic);

export default router;
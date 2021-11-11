import express from "express";
import {
  getUsers,
  getUser,
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/users.js";
import { verifyAdmin } from "../authenticate.js";

const router = express.Router();

router.get("/", verifyAdmin, getUsers);
router.get("/:userId", getUser);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default router;

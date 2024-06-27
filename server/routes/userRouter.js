import express from "express";

import {
  registerUser,
  loginUser,
  allUsers,
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.route("/login").post(loginUser);

export default router;

import express from "express";

import {
  createChat,
  fetchChats,
  createGroup,
} from "../controllers/chatController.js";

const router = express.Router();

router.route("/").post(createChat);
router.route("/:userId").get(fetchChats);
router.route("/createGroup").post(createGroup);

export default router;

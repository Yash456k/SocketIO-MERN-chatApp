import express from "express";

import { createChat, fetchChats } from "../controllers/chatController.js";

const router = express.Router();

router.route("/").post(createChat);
router.route("/:userId").get(fetchChats);

export default router;

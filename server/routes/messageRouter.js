import express from "express";

import {
  allMessages,
  createMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.route("/").post(createMessage);
router.route("/:chatId").get(allMessages);

export default router;

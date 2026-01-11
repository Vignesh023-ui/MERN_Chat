import express from "express";
import { upload } from "../utils/cloudinary.js";

import { getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/get/:from/:to", getMessages);
router.post("/send/:from/:to", upload.single("image"), sendMessage);

export default router;

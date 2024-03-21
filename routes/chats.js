import express from "express";
import { protect } from "../middleware/protect.js";

import { getImageAi, getTextAi, imageAi, textAi } from "../controller/chats.js";

const router = express.Router();

//"/advices"
router.route("/imagine").get(protect, getImageAi).post(protect, imageAi);
router.route("/completion").get(protect, getTextAi).post(protect, textAi);

export default router;

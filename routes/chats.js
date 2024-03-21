import express from "express";
import { protect } from "../middleware/protect.js";

import { imageAi, textAi } from "../controller/chats.js";

const router = express.Router();

//"/advices"
router.route("/imagine").post(protect, imageAi);
router.route("/completion").post(protect, textAi);

export default router;

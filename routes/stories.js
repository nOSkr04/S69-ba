import express from "express";
import { protect, authorize } from "../middleware/protect.js";

import {
  getStories,
  getStory,
  createStory,
  deleteStory,
  updateStory,
} from "../controller/stories.js";

const router = express.Router();

//"/stories"
router
  .route("/")
  .get(getStories)
  .post(protect, authorize("admin", "operator"), createStory);

router
  .route("/:id")
  .get(getStory)
  .delete(protect, authorize("admin", "operator"), deleteStory)
  .put(protect, authorize("admin", "operator"), updateStory);

export default router;

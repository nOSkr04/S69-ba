import express from "express";
import { protect, authorize } from "../middleware/protect.js";

import {
  getLessons,
  getLesson,
  createLesson,
  deleteLesson,
  updateLesson,
} from "../controller/lessons.js";

const router = express.Router();

//"/lessons"
router
  .route("/")
  .get(getLessons)
  .post(protect, authorize("admin", "operator"), createLesson);

router
  .route("/:id")
  .get(getLesson)
  .delete(protect, authorize("admin", "operator"), deleteLesson)
  .put(protect, authorize("admin", "operator"), updateLesson);

export default router;

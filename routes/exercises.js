import express from "express";
import { protect, authorize } from "../middleware/protect.js";

import {
  getExercises,
  getExercise,
  createExercise,
  deleteExercise,
  updateExercise,
} from "../controller/exercises.js";

const router = express.Router();

//"/exercises"
router
  .route("/")
  .get(getExercises)
  .post(protect, authorize("admin", "operator"), createExercise);

router
  .route("/:id")
  .get(getExercise)
  .delete(protect, authorize("admin", "operator"), deleteExercise)
  .put(protect, authorize("admin", "operator"), updateExercise);

export default router;

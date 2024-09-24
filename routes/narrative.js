import express from "express";
import { protect, authorize } from "../middleware/protect.js";

import {
  getNarratives,
  getNarrative,
  createNarrative,
  deleteNarrative,
  updateNarrative,
} from "../controller/narrative.js";

const router = express.Router();

//"/getNarratives"
router
  .route("/")
  .get(getNarratives)
  .post(protect, authorize("admin", "operator"), createNarrative);

router
  .route("/:id")
  .get(getNarrative)
  .delete(protect, authorize("admin", "operator"), deleteNarrative)
  .put(protect, authorize("admin", "operator"), updateNarrative);

export default router;

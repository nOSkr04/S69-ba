import express from "express";
import { protect, authorize } from "../middleware/protect";

import {
  getArticles,
  getArticle,
  createArticle,
  deleteArticle,
  updateArticle,
} from "../controller/articles";

const router = express.Router();

//"/articles"
router
  .route("/")
  .get(getArticles)
  .post(protect, authorize("admin", "operator"), createArticle);

router
  .route("/:id")
  .get(getArticle)
  .delete(protect, authorize("admin", "operator"), deleteArticle)
  .put(protect, authorize("admin", "operator"), updateArticle);

export default router;

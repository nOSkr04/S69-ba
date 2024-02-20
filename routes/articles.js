import express from "express";
import { protect, authorize } from "../middleware/protect.js";

import {
  getArticles,
  getArticle,
  createArticle,
  deleteArticle,
  updateArticle,
  articleHome,
  getWebHome,
} from "../controller/articles.js";

const router = express.Router();

//"/articles"
router
  .route("/")
  .get(getArticles)
  .post(protect, authorize("admin", "operator"), createArticle);

router.route("/home").get(articleHome);
router.route("/web-home").get(getWebHome);

router
  .route("/:id")
  .get(getArticle)
  .delete(protect, authorize("admin", "operator"), deleteArticle)
  .put(protect, authorize("admin", "operator"), updateArticle);

export default router;

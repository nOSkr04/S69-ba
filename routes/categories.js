const { Router } = require("express");
const router = Router();
import { protect, authorize } from "../middleware/protect";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controller/categories";

// /categories/:id/articles
import { getCategoryArticles } from "../controller/articles";
router.route("/:categoryId/articles").get(getCategoryArticles);

//"/api/v1/categories"
router
  .route("/")
  .get(getCategories)
  .post(protect, authorize("admin"), createCategory);

router
  .route("/:id")
  .get(getCategory)
  .put(protect, authorize("admin", "operator"), updateCategory)
  .delete(protect, authorize("admin"), deleteCategory);

export default router;

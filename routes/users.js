import { protect, authorize } from "../middleware/protect";
import { Router } from "express";
import {
  register,
  login,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  logout,
} from "../controller/users";

import { getUserArticles } from "../controller/articles";

const router = Router();

//"/api/v1/users"
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);

router.use(protect);

//"/api/v1/users"
router
  .route("/")
  .get(authorize("admin"), getUsers)
  .post(authorize("admin"), createUser);

router
  .route("/:id")
  .get(authorize("admin", "operator"), getUser)
  .put(authorize("admin"), updateUser)
  .delete(authorize("admin"), deleteUser);

router
  .route("/:id/articles")
  .get(authorize("admin", "operator", "user"), getUserArticles);

export default router;

import express from "express";
// Create an instance of Express Router
const router = express.Router();

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";

router.route("/").post(registerUser).get(getUsers);
router.route("/logout").post(logoutUser);
router.route("/login").post(authUser);
// router.post("/logout", logoutUser);
// router.post("/login", authUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.route("/:id").delete(deleteUser).get(getUserById).put(updateUser);

export default router;

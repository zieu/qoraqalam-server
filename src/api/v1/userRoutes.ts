import express from "express";

import { getUserById, getUserByUsername } from "../../controllers/userController";
import { protect } from "../../controllers/authController";

const router = express.Router();

router.route("/:id").get(protect, getUserById);
router.route("/user/:username").get(protect, getUserByUsername);

export default router;

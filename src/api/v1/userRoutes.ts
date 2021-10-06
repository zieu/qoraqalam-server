import express from "express";

import { getUserById, getUserByUsername, getUser } from "../../controllers/userController";

const router = express.Router();

router.route("/user").get(getUser);
router.route("/user/id/:id").get(getUserById);
router.route("/user/:username").get(getUserByUsername);

export default router;

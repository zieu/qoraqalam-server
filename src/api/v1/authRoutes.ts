import express from "express";
import { signup, loginByEmail, loginByUsername } from "../../controllers/authController";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/loginByEmail").post(loginByEmail);
router.route("/loginByUsername").post(loginByUsername);

export default router;

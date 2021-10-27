import { Router } from "express";

import { createArticle, getArticleById } from "../../controllers/articleController";
import { protect } from "../../controllers/authController";

const router = Router();

router.post("/", protect, createArticle);
router.get("/:id", protect, getArticleById);

export default router;

import { Router } from "express";

import { createArticle, getArticleById, getUserArticles } from "../../controllers/articleController";
import { protect } from "../../controllers/authController";

const router = Router();

router.post("/", protect, createArticle);
router.get("/:id", protect, getArticleById);
router.get("/user/articles", getUserArticles);

export default router;

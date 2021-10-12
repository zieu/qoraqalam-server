import { Router } from "express";

import { createArticle } from "../../controllers/articleController";

const router = Router();

router.post("/", createArticle);

export default router;

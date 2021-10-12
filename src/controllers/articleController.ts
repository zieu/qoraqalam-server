import { Request, Response } from "express";
import articleModule from "../Article/Article";

export const createArticle = async (req: Request, res: Response) => {
  const { content, title, tags } = req.body;

  const article = articleModule().createArticle({ content, title, tags });

  res.json(article);
};

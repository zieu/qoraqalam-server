import { Request, Response } from "express";
import articleModule from "../Article/Article";
import { getToken } from "../utils/getToken";
import { verifyToken } from "../utils/verify";

export const createArticle = async (req: Request, res: Response) => {
  const { content, title, isPublished } = req.body;
  const header = req.headers.authorization;
  const token = getToken(header);
  const doc = await verifyToken(token);

  // @ts-ignore
  if (!doc.success) {
    return {
      success: false,
      status: 401,
    };
  }

  const article = await articleModule().createArticle({ content, title, isPublished }, doc?.user?._id!);

  res.json(article);
};

export const getArticleById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const article = await articleModule().getArticleById(id);
  res.json(article);
};

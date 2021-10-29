import { Request, Response } from "express";

import articleModule from "../Article/Article";
import { getToken } from "../utils/getToken";
import { verifyToken } from "../utils/verify";
import { STATUS_CODES } from "../utils/statusCodes";

export const createArticle = async (req: Request, res: Response) => {
  const { content, title, isPublished } = req.body;
  const header = req.headers.authorization;
  const token = getToken(header);
  const doc = await verifyToken(token);

  // @ts-ignore
  if (!doc.success) {
    return {
      success: false,
      status: STATUS_CODES["UNAUTHORIZED"],
    };
  }

  const article = await articleModule().createArticle({ content, title, isPublished }, doc?.user?._id!);

  res.status(article.status).json(article);
};

export const getArticleById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const article = await articleModule().getArticleById(id);
  res.status(article.status).json(article);
};

export const getUserArticles = async (req: Request, res: Response) => {
  const { id } = req.body;

  const articles = await articleModule().getUserArticles(id);

  res.status(articles.status).json(articles);
};

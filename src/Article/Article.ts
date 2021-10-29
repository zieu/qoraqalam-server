import { Schema } from "mongoose";

import Article, { ArticleType } from "./ArticleModel";
import { STATUS_CODES } from "../utils/statusCodes";

type ArticleData = {
  content: string;
  title: string;
  tags?: string[];
  isPublished?: boolean;
};

type SuccessType = {
  success: true;
  status: number;
  article?: ArticleType | null;
  articles?: ArticleType[] | null;
};

type FailType = {
  success: false;
  status: number;
};

type ResponseType = Promise<SuccessType | FailType>;

function ArticleModule() {
  const createArticle = async (articleData: ArticleData, userId: Schema.Types.ObjectId): ResponseType => {
    try {
      const article = await Article.create({ ...articleData, author: userId });

      return {
        success: true,
        status: STATUS_CODES["CREATED"],
        article,
      };
    } catch (error) {
      return {
        success: false,
        status: STATUS_CODES["BAD_REQUEST"],
      };
    }
  };

  const getArticleById = async (id: string): ResponseType => {
    try {
      const article = await Article.findById(id);
      return {
        success: true,
        status: STATUS_CODES["OK"],
        article,
      };
    } catch (error) {
      return {
        success: false,
        status: STATUS_CODES["NOT_FOUND"],
      };
    }
  };

  const getUserArticles = async (userId: Schema.Types.ObjectId): ResponseType => {
    try {
      const articles = await Article.find({ author: userId, isPublished: true }).select("title createdAt");
      return {
        success: true,
        status: STATUS_CODES["OK"],
        articles,
      };
    } catch (error) {
      return {
        success: false,
        status: STATUS_CODES["NOT_FOUND"],
      };
    }
  };

  return {
    createArticle,
    getArticleById,
    getUserArticles,
  };
}

export default ArticleModule;

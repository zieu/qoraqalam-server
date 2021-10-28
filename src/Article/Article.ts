import Article from "./ArticleModel";
import { Schema } from "mongoose";

type ArticleType = {
  content: string;
  title: string;
  tags?: string[];
  isPublished?: boolean;
};

function ArticleModule() {
  const createArticle = async (articleData: ArticleType, userId: Schema.Types.ObjectId) => {
    try {
      const article = await Article.create({ ...articleData, author: userId });

      return {
        success: true,
        status: 201,
        article,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  };

  const getArticleById = async (id: string) => {
    try {
      const article = await Article.findById(id);
      return {
        succes: true,
        status: 200,
        article,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  };

  const getUserArticles = async (userId: Schema.Types.ObjectId) => {
    try {
      const articles = await Article.find({ author: userId, isPublished: true });
      return {
        success: true,
        status: 200,
        articles,
      };
    } catch (error) {
      return {
        success: false,
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

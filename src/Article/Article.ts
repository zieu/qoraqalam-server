import Article from "./ArticleModel";
import { Schema } from "mongoose";

type ArticleType = {
  content: string;
  title: string;
  tags?: string[];
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

  return {
    createArticle,
  };
}

export default ArticleModule;

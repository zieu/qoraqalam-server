import Article, { ArticleType } from "./ArticleModel";
import { verifyToken } from "../utils/verify";
import { getToken } from "../utils/getToken";

function ArticleModule() {
  const createArticle = async (articleData: ArticleType) => {
    try {
      const article = await Article.create(articleData);

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

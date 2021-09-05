import Article from "./ArticleModel";

export function ArticleModule() {
  const getArticleById = async (id: string) => {
    try {
      const article = await Article.findById(id);
      return {
        success: true,
        status: 200,
        article,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  };
  return { getArticleById };
}

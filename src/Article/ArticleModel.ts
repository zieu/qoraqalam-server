import { model, Schema } from "mongoose";

export type ArticleType = Document & {
  content: string;
  title: string;
  Tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

const ArticleSchema = new Schema<ArticleType>(
  {
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    Tags: {
      type: [String],
    },
  },
  { timestamps: true },
);

export default model<ArticleType>("Article", ArticleSchema);

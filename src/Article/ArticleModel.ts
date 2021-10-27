import { model, Schema } from "mongoose";

export type ArticleType = Document & {
  content: string;
  title: string;
  tags?: string[];
  isPublished: boolean;
  author: Schema.Types.ObjectId;
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
    tags: {
      type: [String],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true },
);

export default model<ArticleType>("Article", ArticleSchema);

import { Schema } from "mongoose";

export type Article = Document & {
    content: string;
    title: string;
    Tags: string[];
    createdAt: Date;
    updatedAt: Date;
};

export const ArticleSchema = new Schema<Article>(
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
            required: true,
        },
    },
    { timestamps: true },
);

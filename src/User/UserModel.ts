import bcrypt from "bcryptjs";
import { model, Schema, SchemaTypes } from "mongoose";

export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  avatar: string;
  articles: string[];
  starredArticles: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    articles: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Article",
      },
    ],
    starredArticles: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Article",
      },
    ],
  },
  { timestamps: true },
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    this.avatar = `https://avatars.dicebear.com/api/bottts/${(this as unknown as IUser).username}.svg`;
    next();
  }
  next();
});

export default model<IUser>("User", UserSchema);

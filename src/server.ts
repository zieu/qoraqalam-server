import { app } from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Pusher from "pusher";

dotenv.config();

const DB = process.env.DB!;

const pusher = new Pusher({
  appId: "1288538",
  key: "fecbab9a3a45b1e7cf0b",
  secret: "0a693743882f1fc4f9c2",
  cluster: "app2",
});
const channel = "articles";

mongoose.connect(DB).then(() => console.log("DB connection successful"));

const db = mongoose.connection;
const PORT = process.env.PORT || 5000;

db.on("error", console.error.bind(console, "Connection Error:"));

db.once("open", () => {
  app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
  const articleCollection = db.collection("articles");
  const changeStream = articleCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const article = change.fullDocument;
      pusher.trigger(channel, "inserted", { id: article?._id, article: article?.article });
    }
  });
});

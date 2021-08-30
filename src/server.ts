import { app } from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const DB = process.env.DB!;

mongoose.connect(DB).then(() => console.log("DB connection successful"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`app is running on port ${PORT}`));

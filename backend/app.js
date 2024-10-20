import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./router/authRouter";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/errorHandle";
import questionRouter from "./router/questionRouter";
const app = express();
const port = 3000;

app.use(cors());
app.use(dotenv.config());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(errorHandler);
app.use(notFound);
app.use("/api/v1/auth", authRouter);
app.use("api/v1/question", questionRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB connected"));

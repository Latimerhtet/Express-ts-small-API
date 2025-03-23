import express, { Express, Request, Response } from "express";
import { connectDB } from "./db/db";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
const app: Express = express();

dotenv.config({
  path: ".env",
});
const port = 6000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/v1", authRouter);
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting database and server : ", error);
  });

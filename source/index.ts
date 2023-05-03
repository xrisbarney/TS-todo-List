import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./ormconfig";


import todoListRouter from "./routes/todoList.routes";
require('dotenv').config()



const main = async (): Promise<void> => {
  // Create connection with DB
  connectDB;
  const app = express();

  //middlewares
  app.use(express.json());

  const port = process.env.PORT;

  //routing
  app.use("/api", todoListRouter);
  app.get('/', (req, res) => {
    res.send('The API endpoints are at /api/v1/!');
  });

  app.listen(port, (): void => {
    console.log(`Server is running on port ${port}`);
  });
};

main().catch((err) => {
  console.log(err);
});
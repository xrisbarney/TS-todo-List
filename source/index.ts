// import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./ormconfig";
// import { createConnection } from "typeorm";
// import todoRouter from "./routes/todo.routes";
// import { ToDo } from "./Entities/ToDo";
// dotenv.config({
//   allowEmptyValues: true,
//   example: "./.env",
// });
require('dotenv').config()



const main = async (): Promise<void> => {
  const app = express();

  //middlewares
  app.use(express.json());
  // app.use(cors());

  const port = process.env.PORT;
  // const connection = await createConnection({
  //   type: "postgres",
  //   username: process.env.USER,
  //   password: process.env.PASSWORD,
  //   database: "typedo",
  //   logging: true,
  //   host: process.env.HOST,
  //   synchronize: true,
  //   port: process.env.DATABASE_PORT,
  //   entities: [ToDo],
  // });

  // if (connection.isConnected) {
  //   console.log("Connected to Postgres");
  // }

  // //routes
  // app.use("/", todoRouter);

  app.listen(port, (): void => {
    console.log(`Server is running on port ${port}`);
  });
};

main().catch((err) => {
  console.log(err);
});
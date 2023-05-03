import { DataSource } from "typeorm";
import { TodoList } from "./entities/TodoList";


// Using environment variables
import dotenv from "dotenv";
dotenv.config();

const connectDB = new DataSource({
  type: "postgres",
  logging: true,
  synchronize: true,
  url: process.env.DATABASE_URL,
  entities: [TodoList],
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  }
})

connectDB
  .initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
  })
  .catch((err) => {
    console.log(connectDB.options)
    console.error(`Data Source initialization error`, err);
  })

export default connectDB;
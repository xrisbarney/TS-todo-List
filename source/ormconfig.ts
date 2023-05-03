import { DataSource } from "typeorm";

// Using environment variables
import dotenv from "dotenv";
dotenv.config();

const connectDB = new DataSource({
  // type: "postgres",
  // url: process.env.DATABASE_URI,
  type: "postgres",
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: true,
  host: process.env.HOST,
  synchronize: true,
  // port: process.env.DATABASE_PORT,
  entities: ["./src/entities/*.ts"],
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
    console.error(`Data Source initialization error`, err);
  })

export default connectDB;
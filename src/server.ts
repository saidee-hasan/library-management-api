import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let server: Server;
const PORT = process.env.PORT;

async function main() {
  try {
    await mongoose.connect(process.env.DB_URL as string);

    console.log("connected mongodb");

    server = app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

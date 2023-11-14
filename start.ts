console.clear();
import express, { Application } from "express";
import cors from "cors";
import { mainApp } from "./mainApp";

const port = 7411;

const app: Application = express();
app.use(express.json());
app.use(cors());
mainApp(app);
let server = app.listen(port, () => {
  console.log("server is running on port: ", port);
});

process.on("uncaughtException", (error: Error) => {
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  server.close(() => {
    process.exit(1);
  });
});

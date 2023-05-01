import express from "express";
import dotenv from "dotenv";
import { join } from "path";
import { Connectdb } from "./Database/Connectdb.js";
import cors from "cors";

import DashboardRoutes from "./Routes/DashboardRoutes.js";

const app = express();

//  get env file  absloute path
let envfileabsPath = join(process.cwd(), "Backend", "Config", ".env");

// Error Handler
process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

//   Confrigation of env File  
if (process.env.PRODUCTION != true) {
  dotenv.config({ path: envfileabsPath });

  app.use(
    cors({
      origin: process.env.FRONTENT_SIDE_URL,
      credentials: true,
      optionsSuccessStatus: 200,
    })
  );
}

// Built in MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Connect Database
Connectdb();

// SetUp Routes

app.use("/", DashboardRoutes);

app.use(express.static(join(process.cwd(), "frontend", "build")));

app.get("*", function (req, res) {
  res.sendFile(join(process.cwd(), "frontend", "build", "index.html"));
});

//get Port
const port = process.env.PORT;
let server = app.listen(port);
console.log(port);

// Error Handler
// process.on("unhandledRejection", (err) => {
//   server.close((err) => {
//     console.log(err);
//     process.exit(1);
//   });
process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

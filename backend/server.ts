import express, { Application } from "express";
import Server from "./src/index";

const app: Application = express();
new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

app
  .listen(PORT, function () {
    console.log(`Server is running on port ${PORT}.`);
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });


//Catch uncaught exceptions
process.on('uncaughtException', function (err) {
  // handle the error safely
  console.error('Error: Uncaught Exception :: ', err);
});

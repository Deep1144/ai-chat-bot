import { Application } from "express";
import homeRoutes from "./home.routes";

export default class Routes {
  constructor(app: Application) {
    app.get("/", (_req, res) => {
      return res.send('API is running');
    });

    app.use("/api", homeRoutes);
  }
}

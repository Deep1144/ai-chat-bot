import { Router } from "express";
import { chatController } from "../controllers/home.controller";

class HomeRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/chat", chatController);
  }
}

export default new HomeRoutes().router;

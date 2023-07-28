import express, { Application } from "express";
import morgan from "morgan";

import { routesInformation } from "./utils/constants";
import swaggerDocs from "./utils/swagger";
import cors from "cors";
export class App {
  private app: Application;
  constructor(private port?: number) {
    this.app = express();
    this.app.use(cors());
    this.setting();
    this.middleware();
    this.routes();
  }
  setting() {
    this.app.set("port", this.port || process.env.PORT || 3000);
  }
  middleware() {
    this.app.use(morgan(`dev`));
    this.app.use(express.json());
  }

  routes() {
    routesInformation.map((element) => {
      this.app.use(element.path, element.routes);
    });
  }
  async listen() {
    await this.app.listen(this.app.get("port"));
    console.log("Server on port " + this.app.get("port"));

    swaggerDocs(this.app, this.app.get("port"));
  }
}

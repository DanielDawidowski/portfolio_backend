import express, { Express } from "express";
import { PortfolioServer } from "./setupServer";
import { config } from "@root/config";

class Application {
  public initialize(): void {
    this.loadConfig();
    const app: Express = express();
    const server: PortfolioServer = new PortfolioServer(app);
    server.start();
  }

  private loadConfig(): void {
    config.validateConfig();
  }
}

const application: Application = new Application();
application.initialize();

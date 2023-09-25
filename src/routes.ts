import { emailRoutes } from "@email/routes/email.route";
import { Application } from "express";

const BASE_PATH = "/api/v1";

export default (app: Application) => {
  const routes = () => {
    app.use(BASE_PATH, emailRoutes.routes());
  };
  routes();
};

import routes from "./routes";
import routesUser from "./context/v1/socket/index";
const express = require("express");

export default class App {
  constructor(public app = express()) {
    this.app = app;
    this.routes();
    this.middlewares();
  }

  private middlewares() { }

  private routes() {
    this.app.use(routes);
    this.app.use(routesUser);
  }
}
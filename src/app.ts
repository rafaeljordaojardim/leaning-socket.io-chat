import routes from "./routes";
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
  }
}
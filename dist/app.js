"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("./routes");
const express = require("express");
class App {
    constructor(app = express()) {
        this.app = app;
        this.app = app;
        this.routes();
        this.middlewares();
    }
    middlewares() { }
    routes() {
        this.app.use(routes_1.default);
    }
}
exports.default = App;

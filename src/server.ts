import App from "./app";
const express = require("express");

const application = new App();

application.app.use(express.static(__dirname + "/public"));
application.app.set("views", __dirname + "/views");
application.app.set("view engine", "ejs");


const server = application.app.listen(3000, () => {
  console.log("Server running");
});

const io = require("socket.io")(server);

import socket from "./libs/socket.io";
socket(io);
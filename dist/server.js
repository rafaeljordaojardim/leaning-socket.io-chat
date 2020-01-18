"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const express = require("express");
const application = new app_1.default();
application.app.use(express.static(__dirname + "/public"));
application.app.set("views", __dirname + "/views");
application.app.set("view engine", "ejs");
const server = application.app.listen(3000, () => {
    console.log("Server running");
});
const io = require("socket.io")(server);
io.on("connection", (socket) => {
    socket.username = "Anonymous";
    socket.broadcast.emit("userConnected", { message: `user ${socket.username} connected` });
    socket.on("change_user", (user) => {
        socket.username = user.name;
        console.log(socket.username);
    });
    socket.on("send_message", (data) => {
        io.emit("new_message", {
            message: `${socket.username}: ${data.message}`
        });
    });
    socket.on('disconnect', (reason) => {
        socket.broadcast.emit("disconnected", {
            message: `${socket.username} was disconnected`
        });
    });
});

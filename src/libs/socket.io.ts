

export default (io) => {
  const messages = [];
  io.on("connection", (socket) => {
    socket.username = "Annonymous";
    socket.on("new_user", (user) => {
      socket.username = user.name;
      console.log(socket.username);
      socket.broadcast.emit("userConnected", { message: `user ${user.name} connected` });
    });

    socket.on("send_message", (data) => {
      messages.push({owner:socket.username, message:data.message});
      io.emit("new_message", {
        message: `${socket.username}: ${data.message}`
      });
    });

    socket.on('disconnect', (reason) => {
      if (reason === "transport close") {
        socket.broadcast.emit("disconnected", {
          message: `${socket.username} was disconnected`
        });
      }
    });
  });
}
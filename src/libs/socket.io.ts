
export default (io) => {
  const messages = [];
  io.on("connection", (socket) => {
    socket.username = "Anonymous";
    socket.emit("previusMessages", messages);
    socket.broadcast.emit("userConnected", { message: `user ${socket.username} connected` });

    socket.on("change_user", (user) => {
      socket.username = user.name;
      console.log(socket.username);
    });

    socket.on("send_message", (data) => {
      messages.push({owner:socket.username, message:data.message});
      io.emit("new_message", {
        message: `${socket.username}: ${data.message}`
      });
    });

    socket.on('disconnect', (reason) => {
      socket.broadcast.emit("disconnected", {
        message: `${socket.username} was disconnected`
      })
    });
  });
}
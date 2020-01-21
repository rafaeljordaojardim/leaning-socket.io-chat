

export default (io) => {
  const messages = [];
  io.on("connection", (socket) => {

    socket.on("new_user", (user) => {
      socket.username = user.name;
      // messages.push({owner: socket.username, message: ` is connected`})
      socket.emit("previusMessages", messages); //send just to the owner socket
      console.log(socket.username);
      socket.broadcast.emit("userConnected", {owner: socket.username, message: "Connected"});
    });

    socket.on("send_message", (data) => {
      messages.push({owner:socket.username, message:data.message});
      io.emit("new_message", {
        owner: socket.username, message: data.message
      });
    });

    socket.on('disconnect', (reason) => {
      if (reason === "transport close") {
        // messages.push({owner: socket.username, message: ` was disconnected`});
        socket.broadcast.emit("disconnected", {
          owner: socket.username, message: ` was disconnected`
        });
      }
    });
  });
}
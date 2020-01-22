import SocketController from "../context/v1/socket/controller";
const socketController = new SocketController();
export default (io) => {
  const messages = [];
  io.on("connection", (socket) => {
    let clients = 0;

    socket.on("new_user", async (user) => {
      socket.username = user.name;
      // messages.push({owner: socket.username, message: ` is connected`})
      socket.emit("previusMessages", await socketController.getAllMessagesFromDb() || []); //send just to the owner socket
      console.log(socket.username);
      clients = Object.keys(io.engine.clients).length;
      io.emit("number_users", {users:clients});
      socket.broadcast.emit("userConnected", {owner: socket.username, message: "Connected"});
    });

    socket.on("send_message", async (data) => {
      messages.push({owner:socket.username, message:data.message});
      await socketController.saveMessage({owner:socket.username, message: data.message})
      io.emit("new_message", {
        owner: socket.username, message: data.message
      });
    });

    socket.on('disconnect', (reason) => {
      clients = Object.keys(io.engine.clients).length;
      io.emit("number_users", {users:clients});
      if (reason === "transport close") {
        // messages.push({owner: socket.username, message: ` was disconnected`});
        socket.broadcast.emit("disconnected", {
          owner: socket.username, message: ` was disconnected`
        });
      }
    });
  });
}
import SocketController from "./context/v1/socket/controller";
// const socketController = new SocketController();
const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("chat");
});

// router.get("/", async (req, res, next) => {
//   const messages = await socketController.getAllMessagesFromDb();
//   console.log(messages);
// });

export default router;
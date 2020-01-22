import SocketReposity from "../../repository/socket-repository";
import { IMessage } from "../../db/interfaces/i-message";

export default class MessageUseCase {
  constructor(
    private readonly socketRepository: SocketReposity = new SocketReposity()
  ) {}

  saveMessage(data: IMessage) {
    return this.socketRepository.saveMessage(data);
  }

  getAllMessagesFromDb() {
    return this.socketRepository.getAllMessagesFromDb();
  }
}
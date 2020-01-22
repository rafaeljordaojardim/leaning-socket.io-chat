import { IMessage } from "src/db/interfaces/i-message";
import Messages from "../db/models/Messages";
export default class SocketReposity {
  constructor() {
  }

  public saveMessage(data: IMessage) {
    let messages = new Messages(data);
    return messages.save();
  }

  public getAllMessagesFromDb() {
    return Messages.find();
  }
}
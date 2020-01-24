import { IMessage } from "src/db/interfaces/i-message";
import Messages from "../db/models/Group";
import User from "../db/models/User";
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

  public veirfyUserExists(username) {
    return User.findOne({ username });
  }
  public updateUser(user) {
    return User.update({username: user.username}, {connectionId: user.connectionId} );
  }

  public saveUser (user) {
    let userDb = new User(user);
    return userDb.save();
  }

  public disconect (username) {
    return User.update({username}, {connectionId: null});
  }

  getOnlineUsers() {
    return User.find({"connectionId": {$ne: null}});;
  }
}
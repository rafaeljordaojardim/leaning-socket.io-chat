import MessageUseCase from "../../../use-cases/socket/message-use-case";
import UserUseCase from "../../../use-cases/socket/user-use-case";

export default class Socket {

  constructor(
    private readonly messageUseCase: MessageUseCase = new MessageUseCase(),
    private readonly userUseCase: UserUseCase = new UserUseCase()
  ) {}

  public saveMessage (data) {
    return this.messageUseCase.saveMessage(data);
  }

  getAllMessagesFromDb () {
    return this.messageUseCase.getAllMessagesFromDb();
  }

  async veirfyUserExists (username) {
    return this.userUseCase.veirfyUserExists(username);
    // if (!response) {
    //   res.send({error:404});
    // }
    // res.send();
  }
   updateUser (user) {
    return this.userUseCase.updateUser(user);
   }

   saveUser(user) {
    return this.userUseCase.saveUser(user);
  }

  disconect(username) {
    return this.userUseCase.disconect(username);
  }

  getOnlineUsers() {
    return this.userUseCase.getOnlineUsers();
  }
} 
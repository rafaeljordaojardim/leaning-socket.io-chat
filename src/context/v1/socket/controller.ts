import MessageUseCase from "../../../use-cases/socket/message-use-case";

export default class Socket {

  constructor(
    private readonly messageUseCase: MessageUseCase = new MessageUseCase()
  ) {}

  public saveMessage(data) {
    return this.messageUseCase.saveMessage(data);
  }

  getAllMessagesFromDb() {
    return this.messageUseCase.getAllMessagesFromDb();
  }
} 
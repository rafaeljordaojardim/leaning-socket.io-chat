import SocketReposity from "../../repository/socket-repository";

export default class UserUseCase {
  constructor(
    private readonly socketRepository: SocketReposity = new SocketReposity()
  ) {}

  async veirfyUserExists(username: String) {
    return this.socketRepository.veirfyUserExists(username);
  }
  
  saveUser(user) {
    return this.socketRepository.saveUser(user);
  }

  disconect(username) {
    return this.socketRepository.disconect(username);
  }

  updateUser(user) {
    return this.socketRepository.updateUser(user)
  }

  getOnlineUsers(username) {
    return this.socketRepository.getOnlineUsers(username);
  }
}
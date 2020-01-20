(function () {
    const socket = io.connect("http://localhost:3000");

    let nickNameInput;
    let messages = document.getElementById("messages");
    let send_message;
    const chat = document.getElementById("chat-page");
    const login = document.getElementById("login-page"); 
    const container = document.getElementsByClassName("container")[0];
    const users = document.getElementsByClassName("users")[0];
    //buttons
    let buttonNickName = document.getElementById("change_nick_name");
    let sendButton = document.getElementById("send");

    window.addEventListener('load', (event) => {
      container.removeChild(chat);
      container.appendChild(login);
    });

    //emits
    buttonNickName.addEventListener("click", () => {
      nickNameInput = document.getElementById("nick_name");
      if(!nickNameInput.value) {
        let error = document.createElement("span");
        let nodeValue = document.createTextNode("Put an username");
        error.appendChild(nodeValue);
        login.appendChild(error);
        nickNameInput.focus();
        return;
      }
      console.log(nickNameInput.value);
      let value = nickNameInput.value;
      nickNameInput.value = "";
      socket.emit("new_user", { name: value });
      container.removeChild(login);
      container.appendChild(chat);
    });

    sendButton.addEventListener("click", () => {
      send_message = document.getElementById("send_message");
      if(!send_message) {
        return;
      }
      let message = send_message.value;
      send_message.value = "";
      socket.emit("send_message", {
        message: message
      });
    });


    //on
    socket.on("userConnected", (data) => {
      messages.innerHTML += "\n" + data.message;
      console.log(data.message);
    });

    socket.on("new_message", (data) => {
      messages.innerHTML += "\n" + data.message;
    });

    socket.on("disconnected", (data) => {
      messages.innerHTML += "\n" + data.message;
      
    });

    socket.on("update_users", (data) => {
      users.innerHTML = data.users < 0 ? 0 : data.users;
    })


}());
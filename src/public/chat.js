(function () {
    const socket = io.connect("http://localhost:3000");

    let nickNameInput;
    let messages;
    let send_message;
    const chat = document.getElementById("chat-page");
    const login = document.getElementById("login-page"); 
    const container = document.getElementsByClassName("container")[0];
    const users = document.getElementsByClassName("users")[0];
    const divSelector = document.getElementById("choose-conversation");
    //buttons
    let buttonNickName = document.getElementById("change_nick_name");
    let sendButton = document.getElementById("send");
    let selector = document.getElementById("select-user");


    //functions
    //load message
    function loadMessage (data)  {
      messages = document.getElementById("messages");
      let div = document.createElement("div");
      let node = document.createTextNode(`${data.owner}: ${data.message}`);
      div.appendChild(node);
      messages.appendChild(div);
    }
  
    //update users
    function updateNumberUsers(number) {
      users.innerHTML = `Users connected ${number}`;
    }
    selector.addEventListener("change", e =>  {
      console.log(selector.options[selector.selectedIndex].value);
    })
    //load online users
    function loadListOnlineUsers(listOnlineUsers) {
      if(listOnlineUsers) {
        for(onlineUser of listOnlineUsers) {
          let option = document.createElement("option");
          option.setAttribute("value", onlineUser.connectionId);
          option.innerHTML = onlineUser.username;
          selector.append(option);
        }
      }
    }

    window.addEventListener('load', (event) => {
      container.removeChild(chat);
      container.removeChild(divSelector);
      container.appendChild(login);
    });

    window.addEventListener("beforeunload", (event) => {
      socket.emit("disconect");
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
      container.appendChild(divSelector);
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
    socket.on("previusMessages", (datas) => {
      for(data of datas) {
        loadMessage(data);
      }
    });

    socket.on("userConnected", (data) => {
      loadMessage(data);
      console.log(data.message);
    });

    socket.on("new_message", (data) => {
      loadMessage(data);
    });

    socket.on("disconnected", (data) => { 
      loadMessage(data);
      
    });

    socket.on("update_users", (data) => {
      loadMessage(data);
    });

    socket.on("number_users", (data) => {
      console.log(data);
      
      updateNumberUsers(data.users);
    });

    socket.on("list-online-users", (listOnlineUsers) => {
      console.log("listOnlineUser", listOnlineUsers);
      
      loadListOnlineUsers(listOnlineUsers);
    });


}());
(function () {
  const socket = io.connect("http://localhost:3000");

    let nickNameInput;
    let messages = document.getElementById("messages");
    let send_message;
    //buttons
    let buttonNickName = document.getElementById("change_nick_name");
    let sendButton = document.getElementById("send");

    //functions
    //load message
    function loadMessage (data)  {
      messages.appendChild(`<div><strong>${data.owner}: </strong>${data.message}</div>`);
    }
    //emits
    buttonNickName.addEventListener("click", () => {
      nickNameInput = document.getElementById("nick_name");
      console.log(nickNameInput.value);
      let value = nickNameInput.value;
      nickNameInput.value = "";
      socket.emit("change_user", { name: value })

    });

    sendButton.addEventListener("click", () => {
      send_message = document.getElementById("send_message");
      loadMessage({owner:socket.username, message:send_message.value});
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
    })
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


}());
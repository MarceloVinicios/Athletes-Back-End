const socketIO = require("socket.io");
const MessageModel = require("../models/MessageModel");

const configureSocketIO = (server) => {
  const io = socketIO(server, { cors: { origin: "http://localhost:5173" }});

  const connectedUsers = {};

  io.on("connection", (socket) => {
    console.log("Usuário conectado!", socket.id);

    socket.on("disconnect", () => {
      if (socket.data && socket.data.username) {
        delete connectedUsers[socket.data.username];
      }
    });

    socket.on("set_username", (username) => {
      socket.data.username = username;
      console.log(socket.data.username)
      connectedUsers[username] = socket;
    });

    socket.on("private_message", async (data) => {
      const { recipient, text } = data;
      const recipientSocket = connectedUsers[recipient];

      if (recipientSocket) {
        recipientSocket.emit("receive_private_message", {
          text,
          authorId: socket.id,
          author: socket.data.username,
        });
      }

      socket.emit("receive_private_message", {
        text,
        authorId: socket.id,
        author: socket.data.username,
      });

      try {
        if (text && socket.data.username && recipient) {
          const savingMessage = await MessageModel.create(
            text,
            socket.data.username,
            recipient
          );
          if (!savingMessage.status) {
            console.log("Error saving message");
          }
        }
      } catch (err) {
        return;
      }
    });

    socket.on("get_old_messages", async (user, recipient) => {
      const oldMessages = await MessageModel.getOldMessages(user, recipient);
      if (!oldMessages.status) {
        socket.emit("error_old_messages", "Error getting old messages");
      } else {
        socket.emit("old_messages", oldMessages.response);
      }
    });
  });

  return io;
};

module.exports = configureSocketIO;

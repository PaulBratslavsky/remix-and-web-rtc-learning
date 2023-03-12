// Socket event handlers
const removeOnlineUser = (socketId, onlineUsers) => {
    console.log(socketId, "socketId");
    console.log(onlineUsers, "onlineUsers");

    if (!onlineUsers[socketId]) return;
    delete onlineUsers[socketId];
    console.log(onlineUsers);
  };


const disconnectEventHandler = (socketId, onlineUsers) => {
  console.log(`user disconnected ${socketId}`);
  removeOnlineUser(socketId, onlineUsers);
};

const loginUserEventHandler = (socket, data, onlineUsers) => {
  onlineUsers[socket.id] = {
    id: socket.id,
    username: data.username,
    password: data.password,
    location: data.location,
  };
  console.log(onlineUsers, "onlineUsers");
};

module.exports = {
  disconnectEventHandler,
  loginUserEventHandler,
  removeOnlineUser,
}; // Path: socket/handlers.js

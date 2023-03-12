import io from "socket.io-client";

export function initSocket() {
  let socket = null;
  socket = io.connect("http://localhost:3000");

  socket.on("serverMessage", (message) => {
    console.log(message);
  });

  socket.on('connect', () => {
    console.log('connected to server from client socket.server.ts');
  });

  return socket;
};

export function loginUser(data, socket) {
  socket.emit("login-user", data);
}

export function logoutUser(userID, socket) {
  socket.emit("logout-user", userID);
}
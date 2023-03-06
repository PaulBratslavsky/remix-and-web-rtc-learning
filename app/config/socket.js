import io from "socket.io-client";

let socket = null;

export function initSocket() {
  socket = io.connect("http://localhost:3000");

  socket.on("serverMessage", (message) => {
    console.log(message);
  });

  socket.on('connect', () => {
    console.log('connected to server from client socket.server.ts');
  });
};

export function login(data) {
  socket.emit("join", data);
}
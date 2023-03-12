const path = require("path");
const express = require("express");
const { PrismaClient } = require("@prisma/client")
const compression = require("compression");
const morgan = require("morgan");
const { createRequestHandler } = require("@remix-run/express");

const app = express();
const prisma = new PrismaClient()

console.log(prisma, "prisma from server.js");

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const {
  loginUserEventHandler,
  disconnectEventHandler,
} = require("./socket/handlers.js");

const BUILD_DIR = path.join(process.cwd(), "build");

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// Socket.io server
// TODO: SHOULD THIS BE STORED IN A DATABASE?
const onlineUsers = {};

const io = new Server(server);

io.on("connection", (socket) => {
  socket.broadcast.emit("serverMessage", `a user connected ${socket.id}`);

  socket.on("login-user", (data) => {
    loginUserEventHandler(socket, data, onlineUsers)
  });

  socket.on("disconnect", () => {
    disconnectEventHandler(socket.id, onlineUsers);
  });
});

// Remix fingerprints its assets so we can cache forever.
app.use(
  "/build",
  express.static("public/build", { immutable: true, maxAge: "1y" })
);

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("public", { maxAge: "1h" }));
app.use(morgan("tiny"));
app.all(
  "*",
  process.env.NODE_ENV === "development"
    ? (req, res, next) => {
        purgeRequireCache();

        return createRequestHandler({
          build: require(BUILD_DIR),
          mode: process.env.NODE_ENV,
        })(req, res, next);
      }
    : createRequestHandler({
        build: require(BUILD_DIR),
        mode: process.env.NODE_ENV,
      })
);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, but then you'll have to reconnect to databases/etc on each
  // change. We prefer the DX of this, so we've included it for you by default
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}

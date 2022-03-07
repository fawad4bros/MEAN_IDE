const http = require("http");
const socketIo = require("socket.io");
const app = require("./utils/server");
const attemptsRouter = require("./routes/attempts");

app.use("/attempts", attemptsRouter);

const port = process.env.PORT || "3000";
app.set("port", port);
const server = http.createServer(app);
// server.listen(port, () => {
//   console.log(`Server Running on ${port}`);
// });

// app.set("port", port);
// const server = http.createServer(app);
app.io = socketIo(server);
app.io.on("connection", app.socketDotIoListener);
server.listen(port, () => {
  console.log("Serve up");
});
// server.listen(port, () => {
//   console.log("Serve up");
// });

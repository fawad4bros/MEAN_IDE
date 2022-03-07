const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const OtsUtil = require("./index");
const connections = require("../bin/connections");
// const mongoose = require("mongoose");
// const { db } = require("../lib/config/config");
// const apis = require("../apis/api");
const app = express();
const corsOptions = {
  origin: "http://localhost:4200",
};
app.use(cors(corsOptions)); //Accepting requests from this domain
// app.use("/upload", express.static("./public/images"));
app.use(json()); //server accept JSON data
app.use(express.urlencoded({ extended: true })); //if true: object as string/arrays
app.socketDotIoListener = (client) => {
  console.log(client.id, "initial transport", client.conn.transport.name);
  client.on("join", (data) => {
    console.log("join", data);
    connections[data.id] = client;
    // console.log(connections);
  });
  client.on("disconnect", () => {
    console.log(client.id, "disconnected..");
  });
};
OtsUtil.getSubListener();
module.exports = app;

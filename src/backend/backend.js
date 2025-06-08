import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {EVENTS} from "../constants/Constants.js";


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });


io.on("connection", (socket) => {
      console.log("Connected")

      let session = socket.handshake.session;
      socket.on(EVENTS.SEND_VOTE, function(vote){

        console.log(vote)
      })
});

httpServer.listen(3001);
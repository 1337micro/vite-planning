import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {EVENTS} from "../constants/Constants.ts";
import {Game} from "../model/Game.ts";
import {User} from "../model/User.js";


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
      console.log("Connected")

      let session = socket.handshake.session;

      socket.on(EVENTS.START_GAME, function () {
        const user = new User();

        const game = new Game();
        game.room.addUserToGame(user)

        socket.emit(EVENTS.GAME_STARTED, game);
      })

      socket.on(EVENTS.SEND_VOTE, function(vote){
        console.log(vote)
      })
});

httpServer.listen(3001);
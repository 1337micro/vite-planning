import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { EVENTS } from "../constants/Constants.ts";
import { Game } from "../model/Game.ts";
import { Room } from "../model/Room.ts";
import { User } from "../model/User.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  console.log("Connected");

  let session = socket.handshake.session;
  console.log("socket", socket);

  socket.on(EVENTS.START_GAME, function () {
    console.log("Start Game");
    const game = new Game();
    socket.emit(EVENTS.GAME_STARTED, game);
  });

  socket.on(EVENTS.JOIN_GAME, function (roomId) {
    console.log("JOIN_GAME");
    const joiningUser = new User({ id: socket.id });
    const joinedRoom = new Room({ id: roomId }); //get joined room from db from gameId

    const game = new Game({ room: joinedRoom });
    game.room.addUserToGame(joiningUser);

    socket.emit(EVENTS.GAME_JOINED, game);
  });

  socket.on(EVENTS.SEND_VOTE, function (vote) {
    console.log(vote);
  });
});

httpServer.listen(3001);

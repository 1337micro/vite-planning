import 'dotenv/config'
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { EVENTS } from "../constants/Constants.ts";
import { Room } from "../model/Room.ts";
import { User } from "../model/User.js";
import {createTables} from "./db/creation/createTables";
import {createRoom, getRoomById, saveRoom} from "./db/dbquery.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

createTables()
  .then(result => {
      console.log('Success', result)
    })
.catch(error => {
  console.error("Could not create tables ", error)
})

io.on("connection", (socket) => {
  console.log("Connected");

  let session = socket.handshake.session;
  //console.log("socket", socket);

  socket.on(EVENTS.START_GAME, async function () {
    console.log("Start Game");
    const room = new Room();
    //save game to database
    await createRoom(room);
    socket.emit(EVENTS.GAME_STARTED, room);
  });

  socket.on(EVENTS.JOIN_GAME, async function (roomId, playerName) {
    console.log("JOIN_GAME", roomId, playerName);
    const joiningUser = new User({ id: socket.id, name: playerName });
    const joinedRoom = new Room({ id: roomId }); //get joined room from db from gameId instead
    joinedRoom.addUserToGame(joiningUser);
    console.log("joinedRoom", joinedRoom);
    await saveRoom(joinedRoom);
    socket.emit(EVENTS.GAME_JOINED, joinedRoom);
  });

  socket.on(EVENTS.SEND_VOTE, function (vote, roomId) {
    console.log("SEND_VOTE", vote, roomId);
  });
});

httpServer.listen(3001);

import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { EVENTS } from "../constants/Constants.ts";
import { Room } from "../model/Room.ts";
import { User } from "../model/User.js";
import { createTables } from "./db/creation/createTables";
import { createRoom, createUser, getRoomById, saveRoom } from "./db/dbquery.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

createTables()
  .then((result) => {
    console.log("Success", result);
  })
  .catch((error) => {
    console.error("Could not create tables ", error);
  });

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
    socket.join(room.id); // Join a socket.io "room" for easier broadcasting of events to other sockets
  });

  socket.on(EVENTS.JOIN_GAME, async function (roomId, playerName) {
    console.log("JOIN_GAME", roomId, playerName);
    const joiningUser = new User({ id: socket.id, name: playerName });
    await createUser(joiningUser); //Save this new user to DB

    const joinedRoomFromDb = await getRoomById(roomId); //get this room from DB
    const joinedRoom = new Room(joinedRoomFromDb);
    joinedRoom.addUserToGame(joiningUser);
    console.log("joinedRoom", joinedRoom);
    await saveRoom(joinedRoom);

    io.to(joinedRoom.id).emit(EVENTS.UPDATE_GAME, joinedRoom); //Let all other users in the room know that this player has joined successfully
    socket.emit(EVENTS.GAME_JOINED, joinedRoom); //Let this player know that he has successfully joined the room
  });

  socket.on(EVENTS.SEND_VOTE, function (vote, roomId) {
    console.log("SEND_VOTE", vote, roomId);
  });
});

httpServer.listen(3001);

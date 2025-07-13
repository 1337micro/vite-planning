import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { EVENTS } from "../constants/Constants.ts";
import { Room } from "../model/Room.ts";
import { User } from "../model/User.js";
import { createTables } from "./db/creation/createTables";
import {
  createRoom,
  createUser,
  getRoomById,
  saveRoom,
  sendVote,
} from "./db/dbquery.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

createTables()
  .then((result) => {
    console.log("Successfully created tables, or tables already created");
  })
  .catch((error) => {
    console.error("Could not create tables ", error);
  });

io.on("connection", (socket) => {
  console.log("Connected");

  let session = socket.handshake.session;
  console.log("session", session);

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

  socket.on(EVENTS.SEND_VOTE, async function (userId, roomId, vote) {
    console.log("SEND_VOTE", userId, vote);
    await sendVote(userId, vote);

    const roomFromDb = await getRoomById(roomId); //get this room from DB
    const room = new Room(roomFromDb);
    console.log("New room", roomFromDb, room);
    socket.emit(EVENTS.UPDATE_GAME, room); //Send the updated room to this player
  });
});

httpServer.listen(3001);

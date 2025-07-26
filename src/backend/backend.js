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
  deleteUser,
  getRoomById,
  getUserById,
  saveRoom,
  sendVote,
  clearAllVotesInRoom,
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

  socket.on("disconnect", async function () {
    console.log("Socket disconnected", socket.id);
    const userId = socket.id;
    const user = await getUserById(userId);

    await deleteUser(userId);

    if (user) {
      const roomId = user.roomid;
      await emitGameUpdate(roomId);
    }
  });

  socket.on(EVENTS.START_GAME, async function () {
    console.log("Start Game");
    const room = new Room();
    //save game to database
    await createRoom(room);
    socket.emit(EVENTS.GAME_STARTED, room);
  });

  socket.on(EVENTS.JOIN_GAME, async function (roomId, playerName, customVotes) {
    console.log("JOIN_GAME", socket, socket.rooms, roomId, playerName, customVotes);

    socket.join(roomId); // Join a socket.io "room" for easier broadcasting of events to other sockets

    const joiningUser = new User({
      id: socket.id,
      name: playerName,
      roomId: roomId,
    });
    await createUser(joiningUser); //Save this new user to DB

    const joinedRoomFromDb = await getRoomById(roomId); //get this room from DB
    const joinedRoom = new Room(joinedRoomFromDb);
    
    // Set custom votes if provided
    if (customVotes && Array.isArray(customVotes) && customVotes.length > 0) {
      joinedRoom.votes = customVotes;
    }
    
    joinedRoom.addUserToGame(joiningUser);
    console.log("joinedRoom", joinedRoom);
    await saveRoom(joinedRoom);

    io.to(joinedRoom.id).emit(EVENTS.UPDATE_GAME, joinedRoom); //Let all other users in the room know that this player has joined successfully
    socket.emit(EVENTS.GAME_JOINED, joinedRoom); //Let this player know that he has successfully joined the room
  });

  socket.on(EVENTS.SEND_VOTE, async function (userId, roomId, vote) {
    console.log("SEND_VOTE", userId, vote);
    await sendVote(userId, vote);

    await emitGameUpdate(roomId);
  });

  socket.on(EVENTS.REVEAL_CARDS, async function (roomId) {
    console.log("REVEAL_CARDS", roomId);
    
    const roomFromDb = await getRoomById(roomId);
    const room = new Room(roomFromDb);
    room.revealCards();
    await saveRoom(room);

    await emitGameUpdate(roomId);
  });

  socket.on(EVENTS.RESTART_GAME, async function (roomId) {
    console.log("RESTART_GAME", roomId);
    
    // Clear all votes for users in this room
    await clearAllVotesInRoom(roomId);
    
    // Set room revealed status to false
    const roomFromDb = await getRoomById(roomId);
    const room = new Room(roomFromDb);
    room.restartGame();
    await saveRoom(room);

    await emitGameUpdate(roomId);
  });

  /**
   * Send out an event to the clients with the updated room object
   * @param roomId
   * @returns {Promise<void>}
   */
  async function emitGameUpdate(roomId) {
    const roomFromDb = await getRoomById(roomId); //get this room from DB
    const room = new Room(roomFromDb);
    console.log("UPDATING GAME", room);
    io.to(room.id).emit(EVENTS.UPDATE_GAME, room); //Let all other users in the room know that this player has joined successfully
    socket.emit(EVENTS.UPDATE_GAME, room); //Send the updated room to this player
  }
});

httpServer.listen(3001);

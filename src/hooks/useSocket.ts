"use client";

import { io } from "socket.io-client";

const socket = io();
function useSocket() {
    // client-side
    socket.on("connect", () => {
      console.log("SOCKET ID ", socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on("disconnect", () => {
      console.log(socket.id); // undefined
    });

    return {socket}
}


export default useSocket;
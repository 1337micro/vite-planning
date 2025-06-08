import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { io } from "socket.io-client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { SocketContext } from "./context/SocketContext.ts";
import { Game } from "./Game.tsx";
import type { Socket } from "socket.io";

import "./index.css";

const socket: Socket = io();

socket.on("connect", () => {
  console.log("SOCKET ID ", socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("disconnect", () => {
  console.log(socket.id); // undefined
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App socket={socket} />,
  },
  {
    path: "/:roomId",
    element: <Game socket={socket} />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SocketContext value={socket}>
      <RouterProvider router={router} />
    </SocketContext>
  </StrictMode>,
);

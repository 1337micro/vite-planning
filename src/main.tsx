import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { io } from "socket.io-client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import {SocketContext} from "./context/SocketContext.ts"
import {Game} from './Game.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:gameId",
    element: <Game />,
  }
]);

const socket = io();

    socket.on("connect", () => {
      console.log("SOCKET ID ", socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on("disconnect", () => {
      console.log(socket.id); // undefined
    });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SocketContext value={socket}>
      <RouterProvider router={router} />
    </SocketContext>
  </StrictMode>,
)

import { createContext } from "react";

import type { Socket } from "socket.io";

export const SocketContext = createContext<Socket | null>(null);

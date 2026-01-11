import { create } from "zustand";
import { io } from "socket.io-client";

import useAuthStore from "./useAuthStore.js";

const API_URL =
  import.meta.env.MODE === "production" ? "" : "http://localhost:5000";

const useSocketStore = create((set, get) => ({
  socket: null,

  // * Online Users - Set for Optimization
  onlineUsers: new Set(),

  connectSocket: () => {
    const { user, isAuthenticated } = useAuthStore.getState();
    const { socket } = get();

    // ? Check Authenticated and Socket Connected
    if (!isAuthenticated || socket?.connected) {
      return;
    }

    // ! Connect to Server Socket
    const newSocket = io(API_URL, {
      query: {
        userId: user._id,
      },
    });
    newSocket.connect();

    set({ socket: newSocket });

    // ? Listen to Online Users
    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: new Set(userIds) });
    });
  },

  disconnectSocket: () => {
    const { socket } = get();

    // ? Check Socket Connected
    if (socket?.connected) {
      // ! only then Disconnect
      socket.disconnect();
    }

    set({ socket: null });
  },
}));

export default useSocketStore;

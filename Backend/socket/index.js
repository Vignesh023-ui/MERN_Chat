import { configEnv } from "../../config.js";
configEnv();

import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

// ? stores Online Users { userId => socketId }
const userSocketMap = new Map();

// ? Emit message to specific user
const emitMessageToUser = (userId, message) => {
  const socketId = userSocketMap.get(userId);

  if (socketId) {
    io.to(socketId).emit("newMessage", message);
  }
};

io.on("connection", (socket) => {
  // ? Get userId from query params
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap.set(userId, socket.id);
  }

  // * Send Online Users to all connected clients
  io.emit("getOnlineUsers", [...userSocketMap.keys()]);

  socket.on("disconnect", () => {
    // ? Remove user from userSocketMap
    userSocketMap.delete(userId);

    io.emit("getOnlineUsers", [...userSocketMap.keys()]);
  });
});

export { app, server, emitMessageToUser };

/*
  console.log(`User Connected: ${socket.id}`);
  
  console.log(`User Disconnected: ${socket.id}`);
*/

import express from "express";
import { app, server } from "./socket/index.js";

import { configEnv, configMorgan, configHelmet } from "../config.js";
configEnv();

import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import connectDB from "./db/configDB.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";

const port = process.env.PORT || 3000;
const __dirname = path.resolve();

// * Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(configHelmet());
// ? app.use(configMorgan());
app.use(express.json());
app.use(cookieParser());

// * Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);

// ! Rendering Frontend
if (process.env.NODE_ENV === "production") {
  // ? Set Static Folder
  app.use(express.static(path.join(__dirname, "./Frontend/dist")));

  // ? Serve React App
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
  });
}

server.listen(port, () => {
  connectDB();
  console.log(`Server Running ...`);
});

export default app;

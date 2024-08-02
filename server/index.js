import express from "express";
import { createServer } from "http";
import { Server as SocketIoServer } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from "./routes/userRouter.js";
import chatRouter from "./routes/chatRouter.js";
import messageRouter from "./routes/messageRouter.js";

import connectToDatabase from "./databaseConfig/connectToDatabase.js";

dotenv.config();
connectToDatabase();

const app = express();
app.use(express.json());
const server = createServer(app);

const corsOptions = {
  origin: [
    "https://socket-io-mern-chat-app.vercel.app",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));

const io = new SocketIoServer(server, {
  cors: corsOptions,
  transports: ["websocket"],
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log("user joined !", userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (chatId) => {
    socket.join(chatId);
    console.log("User joined chat:", chatId);
  });

  socket.on("typing", (chatId) => socket.in(chatId).emit("typing"));
  socket.on("stop typing", (chatId) => socket.in(chatId).emit("stop typing"));

  socket.on("new message", (newMessageReceived, recieverId) => {
    const chatId = newMessageReceived.chat._id;
    console.log("yooooooooo goi reciever id", recieverId);

    if (!chatId) return console.log("Chat ID not defined");

    socket
      .to(chatId)
      .to(recieverId)
      .emit("message received", newMessageReceived);
  });

  socket.on("leave chat", (chatId) => {
    socket.leave(chatId);
    console.log("User left chat:", chatId);
  });

  socket.on("disconnect", () => {
    console.log(`Client with id : ${socket.id} disconnected`);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//basic routing based on which request is hit

app.use("/api/users", userRouter);

app.use("/api/chats", chatRouter);

app.use("/api/messages", messageRouter);

//needed to implement this because the free tier of render.com sleeps after inactivity , so this request just pings it to wake up

app.get("/api/checkIfActive", async (req, res) => {
  try {
    res.status(201).json({ works: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

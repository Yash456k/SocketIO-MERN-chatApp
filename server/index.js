import express from "express";
import { createServer } from "http";
import { Server as SocketIoServer } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import User from "./model/userModel.js";
import Chat from "./model/chatModel.js";
import Message from "./model/messageModel.js";

import userRouter from "./routes/userRouter.js";
import chatRouter from "./routes/chatRouter.js";
import messageRouter from "./routes/messageRouter.js";

import connectToDatabase from "./databaseConfig/connectToDatabase.js";

dotenv.config();
connectToDatabase();

const app = express();
app.use(express.json());
const server = createServer(app);
const io = new SocketIoServer(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

let users = [];

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log("user joined !", userData._id);
    socket.emit("connected");
  });

  socket.on("email-info", (emailSent) => {
    users.push({
      id: socket.id,
      email: emailSent,
    });
    console.log(users);
  });

  socket.on("message-from-client", (data) => {
    const messageData = {
      id: socket.id,
      info: data,
      user: data.user,
      email: data.email,
    };
    socket.emit("message-from-server", messageData);
    socket.broadcast.emit("message-from-server", messageData);
  });

  // New event to handle private messages
  socket.on("private-message", ({ email, message, senderEmail }) => {
    const user = users.find((user) => user.email === email);
    if (user) {
      io.to(user.id).emit("private-message", { message, from: senderEmail });
    }
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("new message", (newMessageRecieved) => {
    const chat = newMessageRecieved.chat;
    console.log("the chat is", chat);

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user == newMessageRecieved.sender._id) return;
      console.log(
        "message sent to",
        user,
        "the message being :",
        newMessageRecieved
      );

      socket.to(user).emit("message received", newMessageRecieved);
    });
  });

  socket.on("disconnect", () => {
    console.log(`Client with id : ${socket.id} disconnected`);
    users = users.filter((user) => user.id !== socket.id);
    console.log(users);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/api/users", userRouter);

app.use("/api/chats", chatRouter);

app.use("/api/messages", messageRouter);

app.post("/api/allChats", async (req, res) => {
  const { userId } = req.body;

  const chats = await Chat.find({ users: { $elemMatch: { $eq: userId } } });
  try {
    res.status(201).json(chats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

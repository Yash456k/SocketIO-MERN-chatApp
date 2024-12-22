import express from "express";
import { createServer } from "http";
import { Server as SocketIoServer } from "socket.io";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import userRouter from "./routes/userRouter.js";
import chatRouter from "./routes/chatRouter.js";
import messageRouter from "./routes/messageRouter.js";
import connectToDatabase from "./databaseConfig/connectToDatabase.js";

connectToDatabase();

const app = express();
app.use(express.json());
const server = createServer(app);

const corsOptions = {
  origin: [process.env.CORS_FRONTEND_URL],
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));

const io = new SocketIoServer(server, {
  cors: corsOptions,
  transports: ["websocket", "polling"],
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
    if (!chatId) return console.log("Chat ID not defined");
    socket.to(chatId).to(recieverId).emit("message received", newMessageReceived);
  });

  socket.on("leave chat", (chatId) => {
    socket.leave(chatId);
    console.log("User left chat:", chatId);
  });

  socket.on("disconnect", () => {
    console.log(`Client with id : ${socket.id} disconnected`);
  });
});

// API Routes
app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRouter);
app.get("/api/checkIfActive", async (req, res) => {
  try {
    res.status(201).json({ works: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Serve static files and handle client-side routing
if (process.env.NODE_ENV === 'production') {
  // Serve static files
  app.use(express.static(path.join(__dirname, "../client/dist")));
  
  // Handle client-side routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
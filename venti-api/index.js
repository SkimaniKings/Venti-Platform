// venti-api/index.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for dev
    methods: ["GET", "POST"],
  },
});

app.use(cors()); // Allow HTTP requests from frontend
app.use(express.json());

// Temporary in-memory store for posts
let posts = [];

// Sample professionals/supporters
// Temporary in-memory store for supporters
const supporters = [
  { id: 1, name: "Alice W.", type: "Volunteer", bio: "Here to listen and help you feel calm." },
  { id: 2, name: "John D.", type: "Paid", bio: "Licensed therapist, available for chat sessions." },
  { id: 3, name: "Maya L.", type: "Free", bio: "Peer supporter, happy to chat anytime." },
  { id: 4, name: "Ethan K.", type: "Paid", bio: "Professional counselor specializing in stress & anxiety." },
  { id: 5, name: "Sophie R.", type: "Volunteer", bio: "Trained listener, here to support you anonymously." },
];

// HTTP GET route for Supporters
app.get("/supporters", (req, res) => {
  res.json(supporters);
});


// Socket.io connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Chatrooms
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
  });

  socket.on("chatMessage", ({ room, userId, message }) => {
    const timestamp = new Date().toISOString();
    io.to(room).emit("message", { userId, message, timestamp });
  });

  // Community wall
  socket.on("getPosts", () => {
    socket.emit("postsUpdate", posts);
  });

  socket.on("newPost", ({ userId, content }) => {
    const timestamp = new Date().toISOString();
    const post = { userId, content, timestamp, likes: 0 };
    posts.unshift(post);
    io.emit("postsUpdate", posts);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(4000, () => console.log("Server running on port 4000"));

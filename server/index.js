import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // The origin of the client app
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
  res.send('Chat Server is running.');
});

io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Handle user joining
  socket.on('join_chat', (username) => {
    socket.username = username;
    console.log(`${username} joined the chat`);
    // Broadcast to all other clients that a user has joined
    socket.broadcast.emit('user_joined', { username });
  });

  // Handle chat messages
  socket.on('send_message', (data) => {
    // Broadcast the message to all clients, including the sender
    io.emit('receive_message', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    if (socket.username) {
      // Broadcast to all other clients that a user has left
      socket.broadcast.emit('user_left', { username: socket.username });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

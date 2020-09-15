import cors from 'cors';

import express from 'express';
import http from 'http';
import socketio from 'socket.io';

import chats from './routes/chats';
import posts from './routes/posts';
import users from './routes/users';

const app = express();
const server = http.createServer(app);
const io = socketio(server, { serveClient: false });

const PORT = 5000;

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
  console.log('user connected: ', socket.id);

  socket.on('send message', (body) => {
    io.emit('message', body);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('/', (_, res) => {
  res.send('<h1>Hello from Express</h1>');
});

app.use('/chats', chats);
app.use('/posts', posts);
app.use('/users', users);

server.listen(PORT, () => {
  console.log(`Listening at: http://localhost:${PORT}`);
});

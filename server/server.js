import cors from 'cors';

import express from 'express';
import chats from './routes/chats';
import posts from './routes/posts';
import users from './routes/users';

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { serveClient: false });

const PORT = 5000;

app.use(cors());
app.use(express.json());

io.on('connection', (newSocket) => {
  console.log('a user connected');
  newSocket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('/', (_, res) => {
  res.send('<h1>Hello from Express</h1>');
});

app.use('/chats', chats);
app.use('/posts', posts);
app.use('/users', users);

http.listen(PORT, () => {
  console.log(`Listening at: http://localhost:${PORT}`);
});

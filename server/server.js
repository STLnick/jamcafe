import cors from 'cors';
import express from 'express';
import chats from './routes/chats';
import posts from './routes/posts';
import users from './routes/users';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
  res.send('<h1>Hello from Express</h1>');
});

app.use('/chats', chats);
app.use('/posts', posts);
app.use('/users', users);

app.listen(PORT, () => {
  console.log(`Listening at: http://localhost:${PORT}`);
});

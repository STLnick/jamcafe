import { Router } from 'express';
import { addChat, getChatsByUsername, updateChat } from '../db';

const router = Router();

// Get chats for one user
router.get('/:username', async (req, res) => {
  res.status(200).json(await getChatsByUsername(req.params.username));
  // res.status(200).send(req.params);
});

// Update a chat (add a new message)
router.patch('/:_id', async (req, res) => {
  res.status(200).json(await updateChat(req.params._id, req.body.message));
});

// Add a chat
router.post('/add', async (req, res) => {
  res.status(201).json(await addChat(req.body));
});

export default router;

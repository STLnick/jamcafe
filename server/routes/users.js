import { Router } from 'express';
import {
  addUser, deleteUser, getUsers, loginUser, updateUser,
} from '../db';

const router = Router();

// Get all users
router.get('/', async (_, res) => {
  res.status(200).json(await getUsers());
});

// Login a user
router.post('/', async (req, res) => {
  res.status(200).json(await loginUser(req.body));
});

// Add a user
router.post('/add', async (req, res) => {
  res.status(201).json(await addUser(req.body));
});

// Update a user
router.patch('/update/:id', async (req, res) => {
  res.status(204).json(await updateUser(req.params.id, req.body));
});

// Delete a user
router.delete('/delete/:id', async (req, res) => {
  res.status(204).json(await deleteUser(req.params.id));
});

export default router;

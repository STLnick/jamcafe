import { Router } from 'express';
import {
  addUser, deleteUser, getUsers, getUserById, updateUser,
} from '../db';

const router = Router();

// Get all users
router.get('/', async (_, res) => {
  res.status(200).json(await getUsers());
});

// Get one user
router.get('/:id', async (req, res) => {
  res.status(200).json(await getUserById(req.params.id));
  // res.status(200).send(req.params);
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

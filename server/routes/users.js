import { Router } from 'express';
import {
  addUser, deleteUser, getUsers, loginUser, updateUser,
} from '../db';

const router = Router();

// Get all users
router.get('/', async (_, res) => {
  try {
    res.status(201).json(await getUsers());
  } catch (err) {
    res.status(500).send((`${err}`));
  }
});

// Login a user
router.post('/', async (req, res) => {
  try {
    res.status(201).json(await loginUser(req.body));
  } catch (err) {
    res.status(500).send((`${err}`));
  }
});

// Add a user
router.post('/add', async (req, res) => {
  try {
    res.status(201).json(await addUser(req.body));
  } catch (err) {
    res.status(500).send((`${err}`));
  }
});

// Update a user
router.patch('/update/:id', async (req, res) => {
  try {
    res.status(204).json(await updateUser(req.params.id, req.body));
  } catch (err) {
    res.status(500).send((`${err}`));
  }
});

// Delete a user
router.delete('/delete/:id', async (req, res) => {
  res.status(204).json(await deleteUser(req.params.id));
});

export default router;

import { Router } from 'express';
import {
  addUser,
  deleteUser,
  getUserByUsername,
  getUserByUid,
  getUsers,
  updateUser,
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

// 'Login' a user - fetch data of user authenticated by firebase
router.post('/', async (req, res) => {
  try {
    res.status(201).json(await getUserByUid(req.body));
  } catch (err) {
    res.status(500).send((`${err}`));
  }
});

// Get a user by username
router.get('/:username', async (req, res) => {
  try {
    res.status(200).json(await getUserByUsername(req.params.username));
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
router.patch('/update/:uid', async (req, res) => {
  try {
    res.status(204).json(await updateUser(req.params.uid, req.body));
  } catch (err) {
    res.status(500).send((`${err}`));
  }
});

// Delete a user
router.delete('/', async (req, res) => {
  try {
    res.status(204).json(await deleteUser(req.body));
  } catch (err) {
    res.status(500).send((`${err}`));
  }
});

export default router;

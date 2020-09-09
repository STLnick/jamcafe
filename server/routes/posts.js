import { Router } from 'express';
import {
  addPost, deletePost, getPosts, getPostsByName, updatePost,
} from '../db';

const router = Router();

// Get all posts
router.get('/', async (_, res) => {
  res.status(200).json(await getPosts());
});

// Get posts for one user
router.get('/:username', async (req, res) => {
  res.status(200).json(await getPostsByName(req.params.username));
  // res.status(200).send(req.params);
});

// Delete a post
router.delete('/', async (req, res) => {
  res.status(200).json(await deletePost(req.body));
  // res.status(200).send(req.params);
});

// Update a post
router.patch('/:_id', async (req, res) => {
  res.status(200).json(await updatePost(req.params._id, req.body));
});

// Add a post
router.post('/add', async (req, res) => {
  res.status(201).json(await addPost(req.body));
});

export default router;

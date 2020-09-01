import { Router } from 'express';
import {
  addPost, deletePost, getPosts, getPostById, updatePost,
} from '../db';

const router = Router();

// Get all posts
router.get('/', async (_, res) => {
  res.status(200).json(await getPosts());
});

// Get one post
router.get('/:id', async (req, res) => {
  res.status(200).json(await getPostById(req.params.id));
  // res.status(200).send(req.params);
});

// Add a post
router.post('/add', async (req, res) => {
  res.status(201).json(await addPost(req.body));
});

// Update a post
router.patch('/update/:id', async (req, res) => {
  res.status(204).json(await updatePost(req.params.id, req.body));
});

// Delete a post
router.delete('/delete/:id', async (req, res) => {
  res.status(204).json(await deletePost(req.params.id));
});

export default router;

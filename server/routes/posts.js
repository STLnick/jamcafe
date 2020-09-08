import { Router } from 'express';
import {
  addPost, deletePost, getPosts, getPostsById, updatePost,
} from '../db';

const router = Router();

// Get all posts
router.get('/', async (_, res) => {
  res.status(200).json(await getPosts());
});

// Get posts for one user
router.post('/', async (req, res) => {
  res.status(200).json(await getPostsById(req.body));
  // res.status(200).send(req.params);
});

// Add a post
router.post('/add', async (req, res) => {
  res.status(201).json(await addPost(req.body));
});

// Update a post
router.patch('/update/:id', async (req, res) => {
  res.status(200).json(await updatePost(
    req.params.id,
    req.body,
    { returnNewDocument: true },
  ));
});

// Delete a post
router.delete('/delete/:id', async (req, res) => {
  res.status(204).json(await deletePost(req.params.id));
});

export default router;

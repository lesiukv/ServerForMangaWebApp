import express from 'express';
import { getPosts, createPost, getPostDetails, deletePost, updatePost } from '../controllers/posts.js'

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPostDetails);
router.delete('/:id', deletePost);
router.patch('/:id', updatePost);

export default router;
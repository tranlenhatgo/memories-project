import express from 'express';
import { getPosts, createPost , updatePost, deletePost, likePost} from '../controllers/posts.js';

import auth from '../middleware/auth.js';

const router = express.Router();


// localhost:5000/posts
router.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.originalUrl}`);
  next();
});

router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;
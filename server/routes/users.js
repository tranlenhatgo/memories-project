import express from 'express';
import { signin, signup } from '../controllers/users.js';

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.originalUrl}`);
  next();
});

router.post('/signin', signin);
router.post('/signup', signup);

export default router;

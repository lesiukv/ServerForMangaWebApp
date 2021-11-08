import express from 'express';
import { getUsers, loginUser, logoutUser, signupUser } from '../controllers/users.js';
import { verifyAdmin } from '../authenticate.js';

const router = express.Router();

router.get('/',  getUsers );
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

export default router;

// server/routes/auth.js
import express from 'express';
import { check } from 'express-validator';
import auth from '../middleware/auth.js';
import {
    register,
    login,
    getProfile,
    updateProfile
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], register);

router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], login);

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

export default router;


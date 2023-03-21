import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  getUsers,
  deleteUser,
  createUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/register').post(registerUser);
router.post('/login', authUser);
router
  .route('/')
  .get(protect, admin, getUsers)
  .post(protect, admin, createUser);
router
  .route('/:id')
  .get(getUserById)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);
router.route('/profile').get(getUserProfile);

export default router;

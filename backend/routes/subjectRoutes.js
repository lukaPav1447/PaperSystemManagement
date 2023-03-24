import express from 'express';
const router = express.Router();
import { getSubjects } from '../controllers/subjectController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getSubjects);

export default router;

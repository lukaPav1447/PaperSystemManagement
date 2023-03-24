import express from 'express';
const router = express.Router();
import {
  getMyPapers,
  createPaper,
  deletePaper,
  getPaperById,
  updatePaper,
} from '../controllers/paperController.js';
import { protect, student, professor } from '../middleware/authMiddleware.js';

router.route('/mypapers').get(protect, student, getMyPapers);
router.route('/').post(protect, student, createPaper);
router
  .route('/:id')
  .get(getPaperById)
  .delete(protect, student, deletePaper)
  .put(protect, student, updatePaper);

export default router;

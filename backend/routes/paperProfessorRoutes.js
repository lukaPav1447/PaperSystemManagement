import express from 'express';
const router = express.Router();
import { deletePaper } from '../controllers/paperController.js';
import {
  getProfessorPapers,
  professorUpdatePaper,
} from '../controllers/paperProfessorController.js';
import { protect, student, professor } from '../middleware/authMiddleware.js';

router.route('/professorpapers').get(protect, professor, getProfessorPapers);

router.route('/:id').patch(protect, professor, professorUpdatePaper);

export default router;

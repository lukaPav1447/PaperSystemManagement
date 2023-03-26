import asyncHandler from 'express-async-handler';
import Paper from '../models/paperModel.js';
import Subject from '../models/subjectModel.js';
import User from '../models/userModel.js';

// @desc    Fetch user papers
// @route   GET /api/papers/professorpapers
// @access  Private/Professor
const getProfessorPapers = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        status: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const papers = await Paper.find({ professor: req.user._id, ...keyword })
    .populate('subjectName', 'subjectName')
    .populate('student', 'firstName lastName email');

  res.json(papers);
});

// @desc    Update paper
// @route   PUT /api/papers/:id
// @access  Private/Student
const professorUpdatePaper = asyncHandler(async (req, res) => {
  const { status, comment } = req.body;

  const paper = await Paper.findById(req.params.id);

  if (paper) {
    paper.status = status;
    paper.comment.push(comment);

    const updatedPaper = await paper.save();
    res.json(updatedPaper);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { getProfessorPapers, professorUpdatePaper };

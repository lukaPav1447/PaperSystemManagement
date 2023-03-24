import asyncHandler from 'express-async-handler';
import Paper from '../models/paperModel.js';

// @desc    Fetch user papers
// @route   GET /api/papers/mypapers
// @access  Private/Student
const getMyPapers = asyncHandler(async (req, res) => {
  const papers = await Paper.find({ student: req.user._id })
    .populate('subjectName', 'subjectName')
    .populate('professor', 'firstName lastName email');

  res.json(papers);
});

// @desc    Create paper
// @route   POST /api/papers
// @access  Private/Student
const createPaper = asyncHandler(async (req, res) => {
  const paper = new Paper({
    student: req.user._id,
    professor: { _id: '641cc923a84d4cdf8dbfda31' },
    subjectName: { _id: '641cc924a84d4cdf8dbfda3b' },
    filePath: '/papers/NewPaper',
    status: 'pending',
  });

  const createdPaper = await paper.save();
  res.status(201).json(createdPaper);
});

// @desc    Delete paper
// @route   DELETE /api/papers/:id
// @access  Private/Student
const deletePaper = asyncHandler(async (req, res) => {
  const paper = await Paper.findById(req.params.id);

  if (paper) {
    await paper.deleteOne();
    res.json({ message: 'Paper removed' });
  } else {
    res.status(404);
    throw new Error('Paper not found');
  }
});

// @desc    Get paper by ID
// @route   GET /api/papers/:id
// @access  Private/Student
const getPaperById = asyncHandler(async (req, res) => {
  const paper = await Paper.findById(req.params.id);

  if (paper) {
    res.json(paper);
  } else {
    res.status(404);
    throw new Error('Paper not found');
  }
});

// @desc    Update paper
// @route   PUT /api/papers/:id
// @access  Private/Student
const updatePaper = asyncHandler(async (req, res) => {
  const { student, professor, subjectName, filePath, status, comment } =
    req.body;

  const paper = await Paper.findById(req.params.id);

  if (paper) {
    paper.student = req.user._id;
    paper.professor = professor;
    paper.subjectName = subjectName;
    paper.filePath = filePath;
    paper.status = status;
    paper.comment = comment;

    const updatedPaper = await paper.save();
    res.json(updatedPaper);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { getMyPapers, createPaper, deletePaper, getPaperById, updatePaper };

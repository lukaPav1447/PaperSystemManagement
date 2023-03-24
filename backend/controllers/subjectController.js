import asyncHandler from 'express-async-handler';
import Subject from '../models/subjectModel.js';

// @desc    Fetch all subjects
// @route   GET /api/subjects
// @access  Private
const getSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find({});
  res.json(subjects);
});

export { getSubjects };

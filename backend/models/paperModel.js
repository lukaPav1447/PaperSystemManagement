import mongoose from 'mongoose';

const professorReview = mongoose.Schema(
  {
    name: { type: String, required: true },
    status: { type: String, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const paperSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    professor: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
    subjectName: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Subject',
    },
    filePath: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['approved', 'pending', 'returned'],
      default: 'pending',
    },
    approvedAt: {
      type: Date,
    },
    comment: [professorReview],
  },
  {
    timestamps: true,
  }
);

const Paper = mongoose.model('Paper', paperSchema);

export default Paper;

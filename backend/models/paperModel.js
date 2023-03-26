import mongoose from 'mongoose';

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
    },
    status: {
      type: String,
      enum: ['approved', 'pending', 'returned'],
      default: 'pending',
    },
    approvedAt: {
      type: Date,
    },
    comment: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Paper = mongoose.model('Paper', paperSchema);

export default Paper;

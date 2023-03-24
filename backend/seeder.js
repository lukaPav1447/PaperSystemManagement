import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import papers from './data/papers.js';
import subjects from './data/subjects.js';
import User from './models/userModel.js';
import Paper from './models/paperModel.js';
import Subject from './models/subjectModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Paper.deleteMany();
    await User.deleteMany();
    await Subject.deleteMany();

    const createdUsers = await User.insertMany(users);
    const createdSubject = await Subject.insertMany(subjects);

    const professorUser = createdUsers[1]._id;
    const studentUser = createdUsers[2]._id;
    const professorUser1 = createdUsers[3]._id;
    const studentUser1 = createdUsers[4]._id;
    const subject1 = createdSubject[1]._id;
    const subject2 = createdSubject[2]._id;

    const samplePapers = papers.map((paper, index) => {
      if (index % 2 === 0) {
        return {
          ...paper,
          student: studentUser,
          professor: professorUser,
          subjectName: subject1,
        };
      } else {
        return {
          ...paper,
          student: studentUser1,
          professor: professorUser1,
          subjectName: subject2,
        };
      }
    });

    await Paper.insertMany(samplePapers);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Paper.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import papers from './data/papers.js';
import User from './models/userModel.js';
import Paper from './models/paperModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Paper.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const professorUser = createdUsers[1]._id;
    const studentUser = createdUsers[2]._id;

    const samplePapers = papers.map((paper) => {
      return { ...paper, student: studentUser, professor: professorUser };
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

import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import paperRoutes from './routes/paperRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/papers', paperRoutes);
app.use('/api/subjects', subjectRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

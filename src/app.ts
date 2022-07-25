require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './utils/connectDB';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import teamRouter from './routes/team.route';
import fixtureRouter from './routes/fixture.route';
import searchRouter from './routes/search.route';

export const app = express();

// Middleware

//  Body Parser
app.use(express.json({ limit: '10kb' }));

//  Cookie Parser
app.use(cookieParser());

//  Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

//  Cors
app.use(
  cors({
    origin: config.get<string>('origin'),
    credentials: true,
  })
);

//  Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/teams', teamRouter);
app.use('/api/fixtures', fixtureRouter);
app.use('/api/search', searchRouter);

// Testing
app.get('/premier_league_api', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to gomoney premier league⚽️⛹️‍♂️👈👈',
  });
});

// UnKnown Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = config.get<number>('port');

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);

  // 👇 call the connectDB function here
  connectDB();

});
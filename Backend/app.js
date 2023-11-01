import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import getDirname from './utils/getDirname.js';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' });
} else if (process.env.NODE_ENV === 'testing') {
  dotenv.config({ path: '.env.testing' });
}

const app = express();
app.use(cors({
  origin: ['http://165.227.240.90', 'http://localhost'],
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.text());
app.use(morgan('dev'));

global.__dirname = getDirname(import.meta.url);

export default app;

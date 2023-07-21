import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import getDirname from './utils/getDirname.js';

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.text());

global.__dirname = getDirname(import.meta.url);

export default app;

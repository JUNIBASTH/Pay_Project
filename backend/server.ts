import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import { connectDB } from './config/db';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
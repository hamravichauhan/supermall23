// server/server.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import morgan from 'morgan';

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', (await import('./routes/auth.js')).default);
app.use('/api/shops', (await import('./routes/shops.js')).default);
app.use('/api/categories', (await import('./routes/categories.js')).default);
app.use('/api/products', (await import('./routes/products.js')).default);
app.use('/api/offers', (await import('./routes/offers.js')).default);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

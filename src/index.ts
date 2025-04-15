import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { connectDB } from './config/db';
import indexRoutes from './routes/index';
import projectRoutes from './routes/projects';
import achievementRoutes from './routes/achievements';
import { errorHandler } from './middleware/errorHandler';
import { loggerMiddleware } from './middleware/logger';

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(loggerMiddleware);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routes
app.use('/', indexRoutes);
app.use('/projects', projectRoutes);
app.use('/achievements', achievementRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

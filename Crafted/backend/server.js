
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const app = express();

dotenv.config();
// Import routers
const authController = require('./controllers/auth');
const carsController = require('./controllers/cars');
const groupController = require('./controllers/group');
const searchController = require('./controllers/search');
const userPanelController = require('./controllers/userpanel');



// Middleware
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes
app.use('/auth', authController);
app.use('/garage', carsController);
app.use('/group', groupController);
app.use('/search', searchController);
app.use('/userpanel', userPanelController);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log('The express app is ready!');
});

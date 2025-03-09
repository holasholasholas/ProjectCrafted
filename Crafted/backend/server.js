// // npm
// const dotenv = require('dotenv');
// dotenv.config();
// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const cors = require('cors');
// const logger = require('morgan');

// // Import routers
// const authRouter = require('./controllers/auth');
// const clientsRouter = require('./controllers/clients');
// const productsRouter = require('./controllers/products')
// const usersRouter = require('./controllers/userControllers')

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI);
// mongoose.connection.on('connected', () => {
//   console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
// });

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(logger('dev'));

// // Routes
// app.use('/auth', authRouter);
// app.use('/clients', clientsRouter);
// app.use('/products', productsRouter);
// app.use('/users', usersRouter);

// // Start the server and listen on port 3000
// app.listen(3000, () => {
//     console.log('The express app is ready!');
//   });
  


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');



dotenv.config();


const app = express();

// middleware 
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

//routes


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

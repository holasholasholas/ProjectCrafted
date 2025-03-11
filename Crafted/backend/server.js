const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/userAuth');


dotenv.config();


const app = express();

// middleware 
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true // This allows cookies and authentication headers
  }));
app.use(express.json());

console.log("MongoDB URI:", process.env.MONGODB_URI); 
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

//routes
app.use('/api', authRoutes); 


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


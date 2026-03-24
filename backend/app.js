const express = require('express');
const port = 4000 ;
const mongoose = require('mongoose');
const cors = require('cors') ;
require('dotenv').config();

const app = express();
// middlewares
app.use(cors());
app.use(express.json());

// import routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth',authRoutes);

// DB connection
mongoose.connect(process.env.MONGO_URI)
    .then( () => console.log("Database Connected"))
    .catch((err) => console.log("DB ERROR:", err));

// Start server
app.listen(port, ()=> {
    console.log(`Server running at http://localhost:${port}`)
});
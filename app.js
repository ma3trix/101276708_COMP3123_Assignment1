const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();



// Body parser middleware
app.use(bodyParser.json());

// MongoDB connection 
mongoose
    .connect('mongodb://localhost/101276708_comp3123_assignment1', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// API routes 
const userRoutes = require('./src/routes/user');
const employeesRoutes = require('./src/routes/employees');

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeesRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
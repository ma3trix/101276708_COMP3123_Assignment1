const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Import the User model
const User = require('./src/models/User');
const Employee = require('./src/models/Employee');

app.get('/', (req, res) => {
    res.send('Welcome to the API root.');
});

app.use(bodyParser.json());

// MongoDB Atlas connection
const atlasConnection = 'mongodb+srv://malikbiyi:captain1234@cluster0.s6z3j2j.mongodb.net/comp3123_assigment1';
mongoose
    .connect(atlasConnection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MongoDB Atlas Connected');
        // Start your server after the database connection is established
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch(err => console.log(err));

// Define your userRoutes and employeesRoutes here
//const userRoutes = require('./src/routes/user');
//const employeesRoutes = require('./src/routes/employees');

//app.use('/api/v1/user', userRoutes);
//app.use('/api/v1/emp', employeesRoutes);

// Refactored signup request handler
const signup = async(req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ status: false, message: 'Invalid data' });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ status: true, message: 'User created successfully' });
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
};

// Refactored login request handler
const login = async(req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ status: false, message: 'Invalid data' });
        }

        // Find the user by username and password
        const user = await User.findOne({ username, password });

        if (!user) {
            return res.status(401).json({ status: false, message: 'Authentication failed' });
        }

        // You can generate and send a token for authentication here

        res.status(200).json({ status: true, message: 'Login successful' });
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
};

// In the same file (app.js) or in a separate employees route file (employees.js):
const getAllEmployees = async(req, res) => {
    try {
        // Use the Employee model to fetch all employees from the database
        const employees = await Employee.find();

        // Send the list of employees as a JSON response
        res.status(200).json({ status: true, employees });
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
};


const createEmployee = async(req, res) => {
    try {
        const { first_name, last_name, email, gender, salary } = req.body;

        if (!first_name || !last_name || !email || !gender || !salary) {
            return res.status(400).json({ status: false, message: 'Invalid data' });
        }

        const newEmployee = new Employee({ first_name, last_name, email, gender, salary });
        await newEmployee.save();

        res.status(201).json({ status: true, message: 'Employee created successfully' });
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
};

const getEmployeeById = async(req, res) => {
    try {
        const employeeId = req.params.eid; // Assuming "eid" is the parameter for the employee ID

        if (!employeeId) {
            return res.status(400).json({ status: false, message: 'Employee ID is required' });
        }

        // Assuming you have a method to find an employee by ID in your Employee model
        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }

        res.status(200).json({ status: true, employee });
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
};

const updateEmployee = async(req, res) => {
    try {
        const employeeId = req.params.eid; // Assuming "eid" is the parameter for the employee ID
        const updates = req.body;

        if (!employeeId) {
            return res.status(400).json({ status: false, message: 'Employee ID is required' });
        }

        // Assuming you have a method to update an employee by ID in your Employee model
        const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, updates, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }

        res.status(200).json({ status: true, employee: updatedEmployee, message: 'Employee updated successfully' });
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
};

// Create the deleteEmployee request handler
const deleteEmployee = async(req, res) => {
    try {
        const employeeId = req.params.eid; // Assuming "eid" is the parameter for the employee ID

        if (!employeeId) {
            return res.status(400).json({ status: false, message: 'Employee ID is required' });
        }

        // Assuming you have a method to delete an employee by ID in your Employee model
        const deletedEmployee = await Employee.findByIdAndRemove(employeeId);

        if (!deletedEmployee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }

        res.status(200).json({ status: true, message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
};


// Define the route for deleting an employee by ID
app.delete('/api/v1/emp/employees/:eid', deleteEmployee);


// Route for updating an employee by ID
app.put('/api/v1/emp/employees/:eid', updateEmployee);


// Route for getting an employee by ID
app.get('/api/v1/emp/employees/:eid', getEmployeeById);

// In your Express application (app.js):
app.post('/api/v1/emp/employees', createEmployee);


app.get('/api/v1/emp/employees', getAllEmployees);

// Route for user signup
app.post('/api/v1/user/signup', signup);

// Route for user login
app.post('/api/v1/user/login', login);


module.exports = app;
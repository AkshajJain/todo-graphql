const jwt = require('jsonwebtoken');
const Todo = require("../models/task");

// Middleware to verify JWT token
exports.verifyToken = async (req, res) => {
    console.log(`hefaskdjf: ${res}`);

    const token = req.headers.authorization;

    console.log(token);

    try {
        // Check if token is provided
        if (!token) {
            return { message: 'Unauthorized: Missing token' };
        }

        // Verify token
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return ({ message: 'Unauthorized: Invalid token' });
            }
            req.decoded = decoded;
            console.log(`decoded payload: ${decoded}`);
            req.user = decoded.email;
        });
    } catch (error) {
        console.error('Error:', error);
        return ({ message: 'Internal server error' });
    }
};

exports.getTasks = async () => {
    try {
        // Fetch tasks
        const tasks = await Todo.find();
        // Map the key 'title' to 'name' for each of the task json object in the list of tasks
        const result = tasks.map(task => ({id: task.id, name: task.title, description: task.description}));
        return result;
    } catch (error) {
        console.error('Error:', error);
        return ({ message: 'Internal server error' });
    }
};

exports.addTask = async (req) => {
    try {

        // console.log(args.input);
        console.log(req.body);
        // Add task
        const task = await Todo.create({title: req.body.name, description:input.description});
        return task;
    } catch (error) {
        console.error('Error:', error);
        return ({ message: 'Failed to add task', error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        // Update task
        const task = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return ({ message: "Task updated successfully", task });
    } catch (error) {
        console.error('Error:', error);
        return ({ message: 'Failed to update task', error: error.message });
    }
};

exports.delTask = async (req, res) => {
    try {
        // Delete task
        const task = await Todo.findByIdAndDelete(req.params.id);
        retrun ({ message: "Task deleted successfully", task });
    } catch (error) {
        console.error('Error:', error);
        return ({ message: 'Task not found', error: error.message });
    }
};

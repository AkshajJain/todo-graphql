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

exports.addTask = async (name, description) => {
    try {
        // Add task
        console.log(name, description);
        const task = await Todo.create({title: name, description});
        return {id: task.id, name: task.title, description: task.description};
    } catch (error) {
        console.error('Error:', error);
        return 'Failed to add task';
    }
};

exports.updateTask = async (id, name , desc) => {
    try {
        // Update task
        const task = await Todo.findByIdAndUpdate(id, {title: name, description: desc}, { new: true });
        return {id: task.id, name: task.title, description: task.description}
    } catch (error) {
        console.error('Error:', error);
        return 'Failed to update task';
    }
};

exports.delTask = async (id) => {
    try {
        // Delete task
        const task = await Todo.findByIdAndDelete(id);
        return "Task deleted successfully";
    } catch (error) {
        console.error('Error:', error);
        return ({ message: 'Task not found', error: error.message });
    }
};

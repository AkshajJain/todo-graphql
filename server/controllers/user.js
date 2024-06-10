// controllers/todo.js
const user = require("../models/user");
const jwt = require("jsonwebtoken");

exports.getUsers = (req, res) => {
    user.find()
        .then((user) => res.json(user))
        .catch((err) =>
            res
                .status(404)
                .json({ message: "user not found", error: err.message })
        );
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if the password is correct
        const existingUser = await user.findOne({ email });
        if(existingUser && password === existingUser.password) {
            const token = jwt.sign({ email: existingUser.email }, process.env.SECRET_KEY, { expiresIn: '5m' });
            existingUser.token = token;
            await existingUser.save();
            return res.status(201).json({ message: 'Password is correct', token });
        }
        else {
            return res.status(401).json({ message: 'email or password is incorrect' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    
};

exports.signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if the email is already registered
        const existingUser = await user.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'Email already exists' });
        }
        // Create a new user
        await user.create({ email, password }); // Use create function
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    
};
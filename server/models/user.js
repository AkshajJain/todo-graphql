// models/todo.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: "String",
        required: true,
    },
    password: {
        type: "String",
    },
    token: {
        type: "String"
    }
});

const user = mongoose.model("user", userSchema);

module.exports = user;
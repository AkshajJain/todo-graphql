// routes/todo.js
const express = require("express");
const router = express.Router();

const {
    signUp,
    login,
    getUsers
} = require("../controllers/user");

router.post("/login", login);

router.post("/", signUp);

router.get("/", getUsers);

module.exports = router;
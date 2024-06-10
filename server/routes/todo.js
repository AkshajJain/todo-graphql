// // routes/todo.js
// const express = require("express");
// const router = express.Router();

// const {
//     getTasks,
//     addTask,
//     updateTask,
//     delTask,
// } = require("../controllers/todo");



// /**
//  * @route GET api/todo
//  * @description get all todo
//  * @access public
//  */
// router.get("/", getTasks);

// /**
//  * @route POST api/todo
//  * @description add a new todo
//  * @access public
//  */
// router.post("/", addTask);

// /**
//  * @route PUT api/todo/:id
//  * @description update todo
//  * @access public
//  */
// router.put("/:id", updateTask);

// /**
//  * @route DELETE api/todo/:id
//  * @description delete todo
//  * @access public
//  */
// router.delete("/:id", delTask);

// module.exports = router;
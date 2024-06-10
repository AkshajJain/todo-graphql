// server.js
require("dotenv").config()
const express = require("express");
const cookieParser = require("cookie-parser");
const {buildSchema} = require("graphql");
const {graphqlHTTP} = require("express-graphql");
const cors = require("cors");

const {
    getTasks,
    addTask,
    updateTask,
    delTask,
    verifyToken
} = require("./controllers/todo");

const user = require("./routes/user")

const connectDB = require("./config/db");

const app = express();

const schema = buildSchema(`
    type Task {
        id: ID!
        name: String
        description: String
    }
        
    type Query {
        getTasks: [Task!]!
    }
        
    type Mutation {
        createTask(name:String, description:String): Task!
        deleteTask(id:ID!): String
        updateTask(id:ID!, name:String, description:String): Task
    }
`);

const root = {
    getTasks: async ({}, {req}) => {return getTasks();},
    createTask: async ({}, {req}) => {return addTask(req);},
    deleteTask: async ({}, req, res) => {return delTask(req, res);},
    updateTask: updateTask
}

connectDB();

app.use(cors()); // added
app.use(express.json({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => res.send("Server up and running"));

// use routes
app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.use("/api/user", user);
// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
// server.js
require("dotenv").config()
const {ApolloServer, gql} = require("apollo-server-express");
const express = require("express");
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


const schema = gql`
    type Task {
        id: ID!
        name: String
        description: String
    }
        
    type Query {
        allTasks: [Task!]!
    }
        
    type Mutation {
        createTask(name:String, description:String): Task
        deleteTask(id:ID!): String
        updateTask(id:ID!, name:String, description:String): Task
    }
`;

const resolvers = {
    Query: {
      allTasks: async () => {
        return await getTasks();
      },
    //   todo: async (_, { id }) => {
    //     return await Todo.findById(id);
    //   },
    },
    Mutation: {
      createTask: async (_, { name, description }) => {
        return await addTask(name, description);
      },
      updateTask: async (_, { id, name, description }) => {
        return await updateTask(id, name, description);
      },
      deleteTask: async (_, { id }) => {
        return await delTask(id);
      },
    },
};

const app = express();
const server = new ApolloServer({ typeDefs: schema, resolvers });

connectDB();

app.use(cors()); // added
app.use(express.json());

app.get("/", (req, res) => res.send("Server up and running"));
app.use("/api/user", user);

server.start().then(() => {
server.applyMiddleware({ app, path:'/graphql' });

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
}).catch(err => console.error('Error starting server:', err));

const express = require("express")
const bodyParser = require("body-parser")
const { expressMiddleware } = require('@apollo/server/express4'); 
const { ApolloServer } = require('@apollo/server');
const cors = require("cors")
const axios = require("axios");
const { todo } = require("node:test");

async function startServer() {
    const PORT = 3000 //port
    const app = express()

    // Apollo server
    const server = new ApolloServer({
        typeDefs:`

            type Users {
                id: ID!
                name: String!
                username: String!
                phone: String!
                email:String!
                website:String
            } 

            type Todo {
                id: ID!
                title: String!
                completed:Boolean
                user:Users
            }
            
            type Query {
                gettodo:[Todo]
                getAllusers:[Users]
                getUser(id:ID!):Users
            }

        `,
        resolvers:{
            Todo: {
                user : async (todo)=>{
                    return (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data
                }
            },
            Query: {
                gettodo: async ()=> (await axios.get(`https://jsonplaceholder.typicode.com/todos/`)).data,
                getAllusers: async ()=> (await axios.get(`https://jsonplaceholder.typicode.com/users/`)).data,
                getUser: async (parent, {id})=> (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,
            }
        }
    })

    // Middleware
    app.use(bodyParser.json())
    app.use(cors())
    
    await server.start()
    app.use("/graphql", expressMiddleware(server))

    // server listening
    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`)
    })
}

startServer();

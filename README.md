# GraphQL REST Todo API

A GraphQL project using Apollo Server to integrate REST APIs from JSONPlaceholder. This project demonstrates how to fetch and combine data from multiple endpoints, providing a `Todo` API with linked `User` data using GraphQL queries.

## Features
- **GraphQL Queries** to fetch todos and users
- **Dynamic User Integration**: Fetch user details associated with each todo
- **REST API Integration**: Uses JSONPlaceholder as a RESTful API source
- **Apollo Server**: Configured with Express for middleware handling

## Endpoints
### Queries
- `gettodo`: Fetches all todos with associated user data.
- `getAllusers`: Fetches all users.
- `getUser(id: ID!)`: Fetches a single user by ID.

### Example Schema
```graphql
type Users {
    id: ID!
    name: String!
    username: String!
    phone: String!
    email: String!
    website: String
}

type Todo {
    id: ID!
    title: String!
    completed: Boolean
    user: Users
}

const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    books: [Book]
  }

  type Mutation {
    createBook(title: String!, content: String!): CreateBookResponse
  }

  type Book {
    id: String!
    title: String!
    content: String!
  }


  type ValidateError { # Validate error type
    param: String!
    msg: String!
  }

  type CreateBookResponse {
    message: String
    book: Book
    errors: [ValidateError] # Send errors to client
  }
`;

module.exports = typeDefs;

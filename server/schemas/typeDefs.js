const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Category {
    name: String
}
type Meme {
    _id: ID
    memeID: String
    title: String
    rarity: String
    category: [Category]
}
type User {
    _id: ID
    username: String
    email: String
    credit: Int
    memes: [Meme]
  }

type Query {
    user: User
    users: [User]
   memes: [Meme]
}

type Auth {
    token: ID
    user: User
  }

type Mutation {
    addUser(username: String!, email: String!, password: String!, credit: Int = 30): Auth
    login(email: String!, password: String!): Auth
    databaseMeme(memeID: String!, title: String!, rarity: String): Meme
  }

`;

module.exports = typeDefs;
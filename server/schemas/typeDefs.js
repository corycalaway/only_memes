const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    name: String
  }
  type Meme {
    _id: ID
    image: String
    title: String
    rarity: String
    category: String
  }
  type User {
    _id: ID
    username: String
    email: String
    credit: Int
    memes: [Meme]
  }

  type Query {
    me: User
    user: User
    users: [User]
    memes: [Meme]
    getStripeSess: StripeSess
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      credit: Int = 30
    ): Auth
    login(username: String!, password: String!): Auth
    databaseMeme(
      title: String!
      image: String
      rarity: String
      category: String
    ): Meme
    addCollection(memeId: ID!): User
    addUserCredits: User
  }

  type Auth {
    token: ID
    user: User
  }

  type StripeSess {
    session: ID
  }
`;

module.exports = typeDefs;

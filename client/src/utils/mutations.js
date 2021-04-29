import gql from "graphql-tag";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_COLLECTION = gql`
  mutation addCollection($memeId: ID!) {
    addCollection(memeId: $memeId) {
      username
      credit
      memes {
        _id
        title
      }
    }
  }
`;

export const DATABASE_MEME = gql`
  mutation databaseMeme(
    $title: String!
    $image: String
    $rarity: String
    $category: String!
  ) {
    databaseMeme(
      title: $title
      image: $image
      rarity: $rarity
      category: $category
    ) {
      _id
      title
      rarity
    }
  }
`;

export const ADD_CREDITS = gql`
  mutation addUserCredits {
    addUserCredits {
      credit
    }
  }
`;

export const SUBSCRIPTION = gql`
mutation userPurchase($source: String!) {
  userPurchase(source: $source) {
username

  }
}
`;
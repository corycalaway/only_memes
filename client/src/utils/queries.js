import gql from "graphql-tag";

export const QUERY_USER = gql`
  {
    user {
      _id
      username
      credit
      memes {
        _id
        image
        title
        rarity
        category
      }
    }
  }
`;

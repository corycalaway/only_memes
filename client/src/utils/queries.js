import gql from "graphql-tag";

export const QUERY_USER = gql`
  {
    users {
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

export const QUERY_MEMES = gql`
  {
    memes {
      _id
      image
      title
      rarity
      category
    }
  }
`;

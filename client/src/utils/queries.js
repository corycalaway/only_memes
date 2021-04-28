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

export const QUERY_ME = gql`
  {
    me {
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

export const QUERY_STRIPE_SESS = gql`
  query getStripeSess {
    getStripeSess {
      session
    }
  }
`;

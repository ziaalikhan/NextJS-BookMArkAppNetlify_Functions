import gql from "graphql-tag";

// useQuery Hook //
export const BOOKMARKDATA = gql`
  {
    bookmarks {
      id
      task
      url
    }
  }
`;

import gql from "graphql-tag";
// use Mutation Hook //

export const ADD_bOOKMARK = gql`
  mutation addBookMark($url: String, $task: String) {
    addBookMark(url: $url, task: $task) {
      task
      url
    }
  }
`;



export const DELETE_BOOKMARK = gql`
mutation deleteTodo($id: ID!) {
  deleteTodo(id: $id)
}
`;
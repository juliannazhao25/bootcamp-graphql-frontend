import gql from 'graphql-tag'

export const ADD_BOOK = gql`
  mutation addBook($input: AddBookInput!) {
    addBook(
      input: $input
    ) 
    {
      id
      title
    }
  }
`

export const GET_BOOKS = gql`
  query allBooks {
    allBooks {
      id
      title
      language
      numPages
    }
  }
`

export default ADD_BOOK

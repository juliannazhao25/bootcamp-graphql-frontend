import gql from 'graphql-tag'

export const GET_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      id
      firstName
      lastName
    }
  }
`

export const GET_AUTHOR_BY_ID = gql`
query authorById($id: ID!) {
  authorById(id: $id)
  {
    id
    firstName
    lastName
  }
}
`

export const GET_BOOKS = gql`
  query allBooks {
    allBooks {
      id
      title
      language
    }
  }
`

import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { ADD_BOOK, GET_BOOKS } from './graphql'

const AddBooks = () => {
  const [addBook, { error, loading }] = useMutation(ADD_BOOK, {
    variables: {
      input: {
        title: 'My New Book',
        language: 'en',
        numPages: 320,
        bestseller: false,
        authorId: '8d65b145-523b-47ea-992a-585a5a596081',
        publisherId: '69a37a28-bce4-47ae-af9b-2a0a72ffc9bc',
      },
    },
    update: (client, { data: { addBook } }) => {
      try {
        const data = client.readQuery({ query: GET_BOOKS })
        data.allBooks = [...data.allBooks, addBook]
        client.writeQuery({ query: GET_BOOKS, data })
      } catch (err) {
        throw new Error(err)
      }
    },
  })

  const { loading: booksLoading, error: booksError, data: booksData } = useQuery(GET_BOOKS)

  if (booksLoading) {
    return 'Loading'
  }

  if (booksError) {
    return `Error: ${booksError}`
  }

  return (
    <div>
      <table>
        {booksData.allBooks.map(book => (
          <tr>
            <td>
              {book.title}
            </td>
            <td>
              {book.language}
            </td>
            <td>
              {book.numPages}
            </td>
          </tr>
        ))}
      </table>
      {loading ? 'Loading' : <button onClick={addBook}>Add Book</button>}
      {error && 'Error!'}
    </div>
  )
}

export default AddBooks

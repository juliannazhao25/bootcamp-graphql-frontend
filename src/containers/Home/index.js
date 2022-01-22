import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { GET_AUTHORS, GET_AUTHOR_BY_ID, GET_BOOKS } from './graphql'
import AddBooks from '../../components/AddBooks'

const Home = () => {
  const history = useHistory()
  const token = localStorage.getItem('token')
  if(!token){
    history.push('/')
  }
  
  const { loading: totalLoading, error: totalError, data: totalData } = useQuery(GET_AUTHORS)

  const authorId = '744f88d9-5ccd-4a41-9b45-b475bb26386e'

  const { loading: indivLoading, error: indivError, data: indivData } = useQuery(GET_AUTHOR_BY_ID, {
    variables: { id: authorId },
  })

  if (totalLoading || indivLoading) {
    return 'Loading...'
  }

  if (totalError) {
    return `Error: ${totalData}`
  }

  if (indivError) {
    return `Error: ${indivError}`
  }

  return (
    <>
      <ul>
        {totalData.allAuthors.map(author => (
          <li>
            {author.firstName} {author.lastName}
          </li>
        ))}
      </ul>
      <ol>
        <li>{indivData.authorById.firstName}</li>
        <li>{indivData.authorById.lastName}</li>
      </ol>
      <AddBooks />
    </>
  )
}

export default Home

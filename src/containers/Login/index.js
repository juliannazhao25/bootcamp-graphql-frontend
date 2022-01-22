import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN } from './graphql'


const Login = () => {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [errorMsg, setError] = useState('')

  const [login, { loading, error }] = useMutation(LOGIN, {
    variables: {
      email,
      password: pass,
    },
    onCompleted: ({ login: { token } }) => {
      localStorage.setItem('token', token)
      history.push('/home')
    },
    onError: () => {
      setError('No User Found!')
    },
  })

  const content = (
    <>
      <body>
        <p>
          <b>Got an account? Log in!</b>
        </p>
        <p>
          <b>No account? </b>
          <a href="/register">Register here!</a>
        </p>
      </body>
      <>
        <input placeholder="email" type="text" name="email" value={email} onChange={e => { setEmail(e.target.value); setError('') }} />
      </>
      <>
        <input placeholder="password" type="password" name="pass" value={pass} onChange={e => { setPass(e.target.value); setError('') }} />
      </>
      <button onClick={() => login()}>Log In!</button>
      <p>{errorMsg}</p>
    </>
  )

  return (
    content
  )
}

export default Login

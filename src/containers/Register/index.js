import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { REGISTER } from './graphql'

const Register = () => {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [errorMsg, setError] = useState('')

  const [register, { loading, error }] = useMutation(REGISTER, {
    variables: {
      input: {
        email,
        password: pass,
      },
    },
    onCompleted: ({ register: { token } }) => {
      localStorage.setItem('token', token)
      history.push('/home')
    },
    onError: () => {
      setError('Cannot Register! Email already Exists.')
    },
  })

  const content = (
    <>
      <body>
        <p>
          <b>Register:</b>
        </p>
      </body>
      <input placeholder="Email" type="text" name="email" value={email} onChange={e => { setEmail(e.target.value); setError('') }} />
      <input placeholder="Password" type="password" name="password" value={pass} onChange={e => { setPass(e.target.value); setError('') }} />
      <div width="50%">
        <button onClick={() => {
          if (email === '') {
            setError('Email cannot be empty')
          } else if (pass === '') {
            setError('Password cannot be empty')
          } else {
            register()
          }
        }}
        >
          Submit!
        </button>
        <p>{errorMsg}</p>
      </div>
    </>
  )
  return (
    content
  )
}

export default Register

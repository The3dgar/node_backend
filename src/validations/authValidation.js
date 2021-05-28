import { check } from 'express-validator'
import checkErrors from '../middlewares/checkErrors'

const login = () => [
  check('email', `"email" is required`).isEmail(),
  check('password', `"password" is required and must have min 6 char`).isLength(
    { min: 6 }
  )
]

const recovery = () => [check('email', `"email" is required`).isEmail()]

const changePassword = () => [
  check('password', `"password" is required and must have 6 chars`)
    .isString()
    .isLength({ min: 6 })
]

const authValidation = (path) => {
  let errorMiddleware = []

  switch (path) {
    case 'login':
      errorMiddleware = login()
      break
    case 'recovery':
      errorMiddleware = recovery()
      break
    case 'changePassword':
      errorMiddleware = changePassword()
      break
  }

  errorMiddleware.push(checkErrors)
  return errorMiddleware
}

export default authValidation

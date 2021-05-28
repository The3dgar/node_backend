import { check } from 'express-validator'
import checkErrors from '../middlewares/checkErrors'
import { userRoles } from '../utils/businessVars'
import { validateDni } from '../utils/general'

const newUser = () => [
  check('name', `"name" is required and must have min 4 chars`)
    .notEmpty()
    .isLength({ min: 4 }),
  check(
    'firstLastName',
    `"firstLastName" is required and must have min 4 chars`
  )
    .notEmpty()
    .isLength({ min: 4 }),
  check(
    'secondLastName',
    `"secondLastName" is required and must have min 4 chars`
  )
    .optional()
    .isLength({ min: 4 }),
  check('dni', `"dni" is required & must be valid`)
    .notEmpty()
    .isLength({ min: 4 })
    .custom(validateDni),
  check('email', `"email" is required`).isEmail(),
  check('password', `"password" must have min 6 char`)
    .optional()
    .isLength({ min: 6 }),
  check(
    'role',
    `role ADMIN just can be setter by ADMIN and must be ${userRoles}`
  )
    .optional()
    .isIn(userRoles)
    .custom((val, { req }) => {
      return val === 'ADMIN' ? req.user.role === 'ADMIN' : true
    })
]

const getUsers = () => [
  check('dni', `dni must be valid`).optional().custom(validateDni)
]

const userValidation = (path) => {
  let errorMiddleware = []
  switch (path) {
    case 'newUser':
      errorMiddleware = newUser()
      break
    case 'getUsers':
      errorMiddleware = getUsers()
      break
  }

  errorMiddleware.push(checkErrors)
  return errorMiddleware
}

export default userValidation

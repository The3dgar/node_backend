/**
  Users Routes
  host+/api/user
*/

import { Router } from 'express'
import userController from '../controllers/userController'
import tokenValidation from '../middlewares/tokenValidation'
import userValidation from '../validations/userValidation'

const userRouter = Router()

userRouter.post('/', userValidation('newUser'), userController.newUser)
userRouter.get(
  '/',
  tokenValidation,
  userValidation('getUsers'),
  userController.getUsers
)

export default userRouter

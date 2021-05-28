/**
  Auth Routes
  host+/api/auth
*/

import { Router } from 'express'
import authController from '../controllers/authController'
import tokenValidation from '../middlewares/tokenValidation'
import authValidation from '../validations/authValidation'

const authRouter = Router()

authRouter.post('/login', authValidation('login'), authController.login)
authRouter.post(
  '/recovery',
  authValidation('recovery'),
  authController.recovery
)
authRouter.put(
  '/',
  tokenValidation,
  authValidation('changePassword'),
  authController.changePassword
)

export default authRouter

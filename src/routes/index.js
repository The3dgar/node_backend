import pkg from '../../package.json'
import { Router } from 'express'
import authRouter from './authRouter'
import userRouter from './userRouter'
const router = Router()

router.get('/', (req, res) => {
  const { name, author, version, description } = pkg

  return res.json({
    name,
    author,
    version,
    description
  })
})

router.use('/auth', authRouter)
router.use('/user', userRouter)

export default router
import { verify } from 'jsonwebtoken'

const tokenValidation = (req, res, next) => {
  const token = req.header('x-token')

  if (!token) return res.sendStatus(401)
  try {
    req.user = verify(token, process.env.SECRET_JWT)
    next()
  } catch (error) {
    console.log(error.toString())
    return res.sendStatus(401)
  }
}

export default tokenValidation

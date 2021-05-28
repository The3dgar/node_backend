import { validationResult } from 'express-validator'

const checkErrors = (req, res, next) => {
  const result = validationResult(req)

  if (result.isEmpty()) return next()

  res.status(400).json(result.mapped())
}

export default checkErrors

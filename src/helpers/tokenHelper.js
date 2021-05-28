import { sign } from 'jsonwebtoken'

export const generateToken = (payload) => {
  return new Promise((res, rej) => {
    sign(
      payload,
      process.env.SECRET_JWT,
      {
        expiresIn: '4h'
      },
      (err, token) => {
        if (err) {
          console.log(err)
          rej('Error in JWT generation')
        }

        res(token)
      }
    )
  })
}

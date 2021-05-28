// services
import authService from '../services/authService'
import userService from '../services/userService'

// helpers
import mailerHelper from '../helpers/mailerHelper'
import { generateToken } from '../helpers/tokenHelper'

const authController = {
  login: async (req, res) => {
    try {
      const user = await authService.loginByEmailAndPassword(req.body)

      if (!user) return res.sendStatus(401)
      if (!user.active) return res.status(403).json('User is not active')
      const token = await generateToken(user)

      res.json({
        token,
        ...user
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        ok: false,
        msg: 'Please contact with admin'
      })
    }
  },

  recovery: async (req, res) => {
    try {
      const user = await userService.findByEmail(req.body.email)

      if (user) {
        const password = await authService.restartPassword(user)
        await mailerHelper.sendMail(user.email, 'recovery', {
          password,
          name: user.name
        })
      }

      res.json('mail send')
    } catch (error) {
      console.log(error)
      res.status(500).json({
        ok: false,
        msg: 'Please contact with admin'
      })
    }
  },

  changePassword: async (req, res) => {
    try {
      await authService.updatePassword(req.user.uid, req.body.password)

      res.json('password change')
    } catch (error) {
      console.log(error.toString())
      return res.status(500).json({
        ok: false,
        msg: 'Please contact with admin'
      })
    }
  }
}

export default authController

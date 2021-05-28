import sessionHelper from '../helpers/sessionHelper'
import userService from '../services/userService'

const userController = {
  newUser: async (req, res) => {
    const session = await sessionHelper.startTransation()
    try {
      const userExist = await userService.findByEmail(req.body.email)

      if (userExist) {
        return res.status(400).json('Email already in use')
      }

      const [user] = await userService.createUser(req.body, session)
      // const token = await userService.generateToken({ userId: user._id })
      // enviar mail de registro con el token para que el usuario lo active en tantas horas!

      await session.commitTransaction()
      res.json(user)
    } catch (error) {
      await session.abortTransaction()
      console.log(error)
      res.status(500).json('Please contact with admin')
    }
  },

  getUsers: async (req, res) => {
    try {
      const [total, users] = await userService.findUser(req.query)

      res.json({
        total,
        users
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        ok: false,
        msg: 'Please contact with admin'
      })
    }
  }
}

export default userController

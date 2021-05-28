import { comparePassword, generatePassword } from '../helpers/passwordHelper'
import userService from './userService'

const authService = {
  loginByEmailAndPassword: async ({ email, password }) => {
    const user = await userService.findByEmail(email)
    if (!user) return false

    const passwordMatch = comparePassword(password, user.password)
    if (!passwordMatch) return false

    return {
      uid: user._id,
      name: user.name,
      firstLastName: user.firstLastName,
      secondLastName: user.secondLastName,
      role: user.role,
      active: user.active,
      changePassword: user.changePassword
    }
  },

  restartPassword: async (user) => {
    const newPassword = generatePassword().slice(-8)
    user.password = generatePassword(newPassword)
    user.changePassword = true
    await user.save()

    return newPassword
  },

  updatePassword: async (uid, newPassword) => {
    const password = generatePassword(newPassword)
    return await userService.updateUser({
      uid,
      password,
      changePassword: false,
    })
  }
}

export default authService

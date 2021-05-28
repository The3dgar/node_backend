import UserModel from '../models/UserModel'
import { generatePassword } from '../helpers/passwordHelper'

const userService = {
  createUser: async (body, session) => {
    const userData = body
    const password = generatePassword(userData.password)
    return await UserModel.create([{ ...userData, password }], { session })
  },

  findUser: async ({ page, limit, ...params }) => {
    const pagination = page > 0 ? page : 1
    const skip = (pagination - 1) * limit || 0
    const query = {}

    if (params) {
      if ('dni' in params) query.dni = params.dni
    }

    const findPromise = new Promise((res) => {
      UserModel.find(query).skip(skip).limit(parseInt(limit)).then(res)
    })

    const totalPromise = new Promise((res) => {
      UserModel.find(query).countDocuments().then(res)
    })

    return Promise.all([totalPromise, findPromise])
  },

  findByEmail: async (email) => {
    return await UserModel.findOne({ email })
  },

  updateUser: async (userData) => {
    return await UserModel.findByIdAndUpdate(userData.uid, { $set: userData })
  }
}

export default userService

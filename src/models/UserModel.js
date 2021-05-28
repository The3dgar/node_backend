import { Schema, model } from 'mongoose'
import { userRoles } from '../utils/businessVars'

const ModelSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    firstLastName: {
      type: String,
      required: true
    },
    secondLastName: {
      type: String
    },
    dni: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    changePassword: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: userRoles,
      default: userRoles[1]
    }
  },
  { timestamps: true, versionKey: false }
)

ModelSchema.set('toJSON', {
  transform: (raw, doc) => {
    const result = {
      ...doc
    }

    delete result.password
    delete result.changePassword

    return result
  }
})

const UserModel = model('User', ModelSchema)
export default UserModel

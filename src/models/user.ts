import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

export interface IUser {
  firstName: string
  email: string
  password: string
  state: boolean
  google: boolean
  role: string
  img?: string
}
const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: [true, 'The First Name is required'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'The email is required'],
  },
  password: {
    type: String,
    required: [true, 'The password is required'],
  },
  img: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: 'ADMIN',
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
})

userSchema.methods.toJSON = function (): void {
  const user = this
  const userObject = user.toObject()
  delete userObject.password

  return userObject
}

userSchema.plugin(uniqueValidator, {
  message: '{PATH} should be unique',
})

export const UserModel = mongoose.model('User', userSchema)

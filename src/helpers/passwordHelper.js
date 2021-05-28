import { genSaltSync, hashSync, compareSync } from 'bcryptjs'

export const generatePassword = (password = '') => {
  const salt = genSaltSync()
  return hashSync(password, salt)
}

export const comparePassword = (password = '', userPassword = 'helloWord') => {
  return compareSync(password, userPassword)
}

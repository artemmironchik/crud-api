import { v4 as uuid } from 'uuid'

import { users } from "../database/db"
import { User, UserFields } from "../models/user"

const getUsers = () => users

const getUser = (id: User['id']) => {
  const user = users.find((user) => user.id === id)

  return user
}

const createUser = (fields: UserFields) => {
  const newUser = {
    id: uuid(),
    ...fields,
  }

  users.push(newUser)

  return newUser
}

export const userService = {
  getUser,
  getUsers,
  createUser,
}

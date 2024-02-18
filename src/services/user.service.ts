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

const updateUser = (id: User['id'], fields: Partial<UserFields>) => {
  const userIndex = users.findIndex((user) => user.id === id)

  if (userIndex === -1) {
    return
  }

  const filteredFields = Object.entries(fields)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
  
  const updatedUser = {
    ...users[userIndex],
    ...filteredFields,
  }

  users[userIndex] = updatedUser

  return updatedUser
}

export const userService = {
  getUser,
  getUsers,
  createUser,
  updateUser,
}

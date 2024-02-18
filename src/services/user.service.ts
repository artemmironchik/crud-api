import { users } from "../database/db"
import { User } from "../models/user"

const getUsers = () => users

const getUser = (id: User['id']) => {
  const user = users.find((user) => user.id === id)

  return user
}

export const userService = {
  getUser,
  getUsers,
}

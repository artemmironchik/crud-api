import { v4 as uuid } from 'uuid'

import { User } from '../models/user'

export const users: User[] = [
  {
    id: uuid(),
    username: 'Artem',
    age: 19,
    hobbies: ['reading', 'playing football'],
  },
  {
    id: uuid(),
    username: 'Julya',
    age: 19,
    hobbies: ['sleeping'],
  },
  {
    id: uuid(),
    username: 'Nadezhda',
    age: 73,
    hobbies: [],
  },
  {
    id: uuid(),
    username: 'Matvey',
    age: 19,
    hobbies: ['reading', 'traveling'],
  },
  {
    id: uuid(),
    username: 'Alina',
    age: 25,
    hobbies: ['dancing', 'singing'],
  },
]

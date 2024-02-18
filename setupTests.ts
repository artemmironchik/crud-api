export const mockedUsers = [
  {
    id: "cd250eb1-9eb5-4b64-ab88-36c194eef831",
    username: "Artem",
    age: 19,
    hobbies: [
        "reading",
        "playing football"
    ]
  },
  {
      id: "6bd85e7e-6a76-4f2a-9345-338b20501e56",
      username: "Julya",
      age: 19,
      hobbies: [
          "sleeping"
      ]
  },
  {
      id: "2278e62d-3f1b-409e-9c2e-069b92e03c64",
      username: "Nadezhda",
      age: 73,
      hobbies: []
  },
  {
      id: "6f8cdf7a-63b3-4904-81f2-a37c863290f9",
      username: "Matvey",
      age: 19,
      hobbies: [
          "reading",
          "traveling"
      ]
  },
  {
      id: "d9ce1609-20d2-430d-bb19-d902e02f91a7",
      username: "Alina",
      age: 25,
      hobbies: [
          "dancing",
          "singing"
      ]
  }
]

export const testId = '6bd85e7e-6a76-4f2a-9345-338b20501e50'

jest.mock('./src/database/db', () => ({
  users: mockedUsers,
}))
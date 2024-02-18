import request from 'supertest';

import { mockedUsers, testId } from '../../setupTests';
import { server } from '../../src/index'
import { API_URL } from '../../src/constants/api';
import { ErrorMessage, StatusCode } from '../../src/enums';

describe('PUT /api/users/:id', () => {
  afterAll(done => {
    server.close();
    done();
  });

  const data = {
    username: 'test user',
  }

  test('should answer with status code 200 and updated record', async () => {
    const userId = mockedUsers[0].id

    const res = await request(server).put(API_URL + `/${userId}`).send(data)

    expect(res.statusCode).toBe(StatusCode.OK)
    expect(res.body).toEqual({ ...mockedUsers[0], ...data })
  })

  test('should answer with status code 400 and corresponding message if userId is invalid (not uuid)', async () => {
    const invalidId = 'invalid id'

    const res = await request(server).put(API_URL + `/${invalidId}`).send(data)

    expect(res.statusCode).toBe(StatusCode.BAD_REQUEST)
    expect(res.body).toEqual({ message: ErrorMessage.INVALID_ID_TYPE })
  })

  test("should answer with status code 404 and corresponding message if record with id === userId doesn't exist", async () => {
    const userId = testId

    const res = await request(server).put(API_URL + `/${userId}`).send(data)

    expect(res.statusCode).toBe(StatusCode.NOT_FOUND)
    expect(res.body).toEqual({ message: `User with id ${userId} is not found` })
  })
})
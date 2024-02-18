import request from 'supertest';
import { v4 as uuid } from 'uuid';

import { server } from '../../src/index'
import { API_URL } from '../../src/constants/api';
import { ErrorMessage, StatusCode } from '../../src/enums';

jest.mock('uuid', () => ({
  v4: jest.fn(),
}))

describe('POST /api/users', () => {
  afterAll(done => {
    server.close();
    done();
  });

  test('should answer with status code 201 and newly created record', async () => {
    const body = {
      username: 'kichnorim',
      age: 19,
      hobbies: ['golf'],
    }

    const id = 'id'

    jest.mocked(uuid).mockReturnValue(id)

    const res = await request(server).post(API_URL).send(body)

    expect(res.statusCode).toBe(StatusCode.CREATED)
    expect(res.body).toEqual({ id, ...body })
  })

  test('should answer with status code 400 and corresponding message if request body does not contain required fields', async () => {
    const body = {
      username: 'kichnorim',
      age: 19,
    }

    const res = await request(server).post(API_URL).send(body)

    expect(res.statusCode).toBe(StatusCode.BAD_REQUEST)
    expect(res.body).toEqual({ message: ErrorMessage.MISSING_PARAMS })
  })
})
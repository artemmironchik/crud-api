import { validate } from "uuid";
import { IncomingMessage, ServerResponse } from "http";

import { StatusCode } from "../enums/status-code.enum";
import { ErrorMessage } from "../enums";
import { User } from "../models/user";

export const sendResponse = (res: ServerResponse, statusCode: StatusCode, data: unknown) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify(data))
  res.end()
};

export const notFound = (req: IncomingMessage, res: ServerResponse) => {
  const data = { 
    message: `Method ${req.method} not found on route ${req.url}` 
  }

  sendResponse(res, StatusCode.NOT_FOUND, data)
}

export const getIdFromUrl = (url?: string) => {
  return url?.split('/')[3] || undefined
}

export const isIdValid = (res: ServerResponse, userId?: string): userId is string => {
  if (!userId) {
    sendResponse(res, StatusCode.BAD_REQUEST, { 
      message: ErrorMessage.INVALID_URL 
    })

    return false
  }

  if (!validate(userId)) {
    sendResponse(res, StatusCode.BAD_REQUEST, { 
      message: ErrorMessage.INVALID_ID_TYPE 
    })

    return false
  }

  return true
}

export const validateUserFields = (
  username: string, 
  age: number, 
  hobbies: string[], 
  res: ServerResponse
) => {
  if (!username || !age || !hobbies) {
    sendResponse(res, StatusCode.BAD_REQUEST, {
      message: ErrorMessage.MISSING_PARAMS,
    })

    return false
  }

  if (typeof username !== 'string' || !username.trim()) {
    sendResponse(res, StatusCode.BAD_REQUEST, {
      message: ErrorMessage.INVALID_USERNAME,
    })

    return false
  }

  if (typeof age !== 'number') {
    sendResponse(res, StatusCode.BAD_REQUEST, {
      message: ErrorMessage.INVALID_AGE,
    })

    return false
  }

  if (!Array.isArray(hobbies)
      || hobbies.some((hobby) => typeof hobby !== 'string' || !hobby.trim())) {
    sendResponse(res, StatusCode.BAD_REQUEST, {
      message: ErrorMessage.INVALID_HOBBIES,
    })

    return false
  }

  return true
}

export const parseBody = (req: IncomingMessage): Promise<User> => {
  return new Promise((resolve, reject) => {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      try {
        const parsedBody = JSON.parse(body)

        resolve(parsedBody)
      } catch {
        reject()
      }
    })
  })
}

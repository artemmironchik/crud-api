import { validate } from "uuid";
import { IncomingMessage, ServerResponse } from "http";
import { StatusCode } from "../enums/status-code.enum";
import { ErrorMessage } from "../enums";

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
    sendResponse(res, StatusCode.BAD_REQUEST, { message: ErrorMessage.INVALID_URL })

    return false
  }

  if (!validate(userId)) {
    sendResponse(res, StatusCode.BAD_REQUEST, { message: ErrorMessage.INVALID_ID_TYPE })

    return false
  }

  return true
}

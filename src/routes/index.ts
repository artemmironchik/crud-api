import { IncomingMessage, ServerResponse } from "http";

import { notFound, sendResponse } from "../utils";
import { ErrorMessage, StatusCode } from "../enums"
import { get } from "../handlers";

export const routes = (req: IncomingMessage, res: ServerResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        get(req, res)

        break
      case 'POST':
        break
      case 'PUT':
        break
      case 'DELETE':
        break
      default:
        notFound(req, res)

        break
    }
  } catch (err) {
    sendResponse(res, StatusCode.SERVER_ERROR, {
      message: `${ErrorMessage.SERVER_ERROR}: ${(err as Error).message}`,
    })
  }
}

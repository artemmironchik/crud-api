import { IncomingMessage, ServerResponse } from "http";

import { notFound, sendResponse } from "../utils";
import { ErrorMessage, StatusCode } from "../enums"
import { create, get, update, deleteHandler } from "../handlers";

export const routes = (req: IncomingMessage, res: ServerResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        get(req, res)

        break
      case 'POST':
        create(req, res)

        break
      case 'PUT':
        update(req, res)

        break
      case 'DELETE':
        deleteHandler(req, res)

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

import { IncomingMessage, ServerResponse } from "http";

import { getIdFromUrl, isIdValid, notFound, sendResponse } from "../../utils";
import { userService } from "../../services/user.service";
import { StatusCode } from "../../enums";
import { API_URL } from "../../constants/api";

export const handler = async (req: IncomingMessage, res: ServerResponse) => {
  const { url } = req

  if (!url) {
    notFound(req, res)
  }

  if (url?.startsWith(API_URL + '/')) {
    const userId = getIdFromUrl(url)
  
      if (!isIdValid(res, userId)) {  
        return
      }

      const user = userService.getUser(userId)

      if (!user) {
        sendResponse(res, StatusCode.NOT_FOUND, { message: `User with id ${userId} is not found` })

        return
      }
  
      const deletedUser = userService.deleteUser(userId)

      sendResponse(res, StatusCode.DELETED, deletedUser)
  } else {
    notFound(req, res)
  }
}
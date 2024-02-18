import { IncomingMessage, ServerResponse } from "http"

import { userService } from "../../services/user.service"
import { getIdFromUrl, isIdValid, notFound, sendResponse } from "../../utils"
import { StatusCode } from "../../enums"
import { API_URL } from "../../constants/api"

export const handler = (req: IncomingMessage, res: ServerResponse) => {
  const { url } = req

  if (!url) {
    notFound(req, res)
  }

  const usersUrl = API_URL

  if (url === usersUrl) {
    const users = userService.getUsers()

    sendResponse(res, StatusCode.OK, users)
  } else if (url?.startsWith(usersUrl + '/')) {
    const userId = getIdFromUrl(url)

    if (!isIdValid(res, userId)) {
      return
    }

    const user = userService.getUser(userId)

    if (user) {
      sendResponse(res, StatusCode.OK, user)
    } else {
      sendResponse(res, StatusCode.NOT_FOUND, { message: `User with id ${userId} is not found` })
    }
  } else {
    notFound(req, res)
  }
}

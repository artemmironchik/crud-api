import { IncomingMessage, ServerResponse } from "http";

import { getIdFromUrl, isIdValid, notFound, parseBody, sendResponse, validateUserFields } from "../../utils";
import { userService } from "../../services/user.service";
import { UserFields } from "../../models/user";
import { ErrorMessage, StatusCode } from "../../enums";
import { API_URL } from "../../constants/api";

export const handler = async (req: IncomingMessage, res: ServerResponse) => {
  const { url } = req

  if (!url) {
    notFound(req, res)
  }

  if (url?.startsWith(API_URL + '/')) {
    try {
      const userId = getIdFromUrl(url)
  
      if (!isIdValid(res, userId)) {  
        return
      }

      const user = userService.getUser(userId)

      if (!user) {
        sendResponse(res, StatusCode.NOT_FOUND, { message: `User with id ${userId} is not found` })
      }

      const body = await parseBody(req)
    
      const { username, age, hobbies } = body
    
      if (!validateUserFields(username, age, hobbies, res)) {
        return
      }
  
      const trimmedHobbies = hobbies && hobbies.map((hobby) => hobby.trim()) 
  
      const fields: Partial<UserFields> = {
        username: username && username.trim(),
        age,
        hobbies: trimmedHobbies,
      }
  
      const updatedUser = userService.updateUser(userId, fields)
  
      sendResponse(res, StatusCode.OK, updatedUser)
    } catch {
      sendResponse(res, StatusCode.BAD_REQUEST, { message:  ErrorMessage.INVALID_BODY })
    }
  } else {
    notFound(req, res)
  }
}

import { IncomingMessage, ServerResponse } from "http";

import { notFound, parseBody, sendResponse, validateUserFields } from "../../utils";
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
      const body = await parseBody(req)
    
      const { username, age, hobbies } = body
    
      if (!validateUserFields(username, age, hobbies, res, true)) {
        return
      }
  
      const trimmedHobbies = hobbies.map((hobby) => hobby.trim()) 
  
      const fields: UserFields = {
        username: username.trim(),
        age,
        hobbies: trimmedHobbies,
      }
  
      const newUser = userService.createUser(fields)
  
      sendResponse(res, StatusCode.CREATED, newUser)
    } catch {
      sendResponse(res, StatusCode.BAD_REQUEST, { message:  ErrorMessage.INVALID_BODY })
    }
  } else {
    notFound(req, res)
  }
}

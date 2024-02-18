export enum ErrorMessage {
  SERVER_ERROR = 'Internal Server Error',
  INVALID_URL = 'No id provided',
  INVALID_ID_TYPE = 'Id is not of uuid type',
  MISSING_PARAMS = 'Username, age and hobbies are required params',
  INVALID_USERNAME = 'Username should be of string type',
  INVALID_AGE = 'Age should be of number type',
  INVALID_HOBBIES = 'Hobbies should be an array of strings',
  INVALID_BODY = 'Invalid body',
}
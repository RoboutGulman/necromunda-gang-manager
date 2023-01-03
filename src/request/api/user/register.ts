import {ApiRequest, RequestMethod} from "../../request";

const URL = "/api/user/register";

export type RegisterRequest = {
  username?: string;
  password?: string;
};

export type RegisterResponse = {
  id?: number;
  success: boolean;
  message: string;
};

export async function register({username, password}: RegisterRequest): Promise<RegisterResponse> {
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.POST);
  apiRequest.setUrl(URL);
  apiRequest.setJsonBody({
    username: username,
    password: password,
  });

  const response: any = await apiRequest.send();

  return {
    id: response["id"],
    message: response["error_message"],
    success: response["success"],
  };
}

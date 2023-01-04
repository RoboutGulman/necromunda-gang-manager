import {ApiRequest, RequestMethod} from "../../request";

const URL = "/api/user/login";

export type LoginRequest = {
  username?: string;
  password?: string;
};

export async function login({username, password}: LoginRequest): Promise<boolean> {
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.POST);
  apiRequest.setUrl(URL);
  apiRequest.setJsonBody({
    username: username,
    password: password,
  });
  const response: any = await apiRequest.send();

  return response["authorized"];
}
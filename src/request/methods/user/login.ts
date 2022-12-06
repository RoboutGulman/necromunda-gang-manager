import {ApiRequest, AuthTokenCookie, RequestMethod} from "../../request";

const TOKEN_EXPIRE_TIME = 24 * 60 * 60 * 3; // 3 days

function saveAuthTokenCookie(token: string) {
  document.cookie = `${AuthTokenCookie}=${token}; max-age=${TOKEN_EXPIRE_TIME};`
}

export namespace ApiMethods {
  const URL = "/api/user/login";

  export type LoginRequest = {
    username?: string;
    password?: string;
  };

  export async function login({username, password} : LoginRequest): Promise<boolean> {
    const apiRequest = new ApiRequest();
    apiRequest.setMethod(RequestMethod.POST);
    apiRequest.setUrl(URL);
    apiRequest.setJsonBody({
      username: username,
      password: password,
    });
    const response: any = await apiRequest.send();

    if (response["authorized"]) {
      saveAuthTokenCookie(response["token"])
    }

    return response["authorized"];
  }
}

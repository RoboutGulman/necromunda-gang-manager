import {request} from "../../request";
import {BASE_URI} from "../../baseUri";

export namespace ApiMethods {
  const URL = BASE_URI + "/user/login";

  export type LoginRequest = {
    username?: string;
    password?: string;
  };

  export async function login({username, password} : LoginRequest): Promise<boolean> {
    const response: {
      authenticated: boolean
    } = await request({
      method: "POST",
      url: URL,
      body: {
        username: username,
        password: password
      }
    });

    return response.authenticated;
  }
}

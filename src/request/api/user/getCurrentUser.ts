import {ApiRequest, RequestMethod} from "../../request";

const URL = "/api/user/current";

export type AuthorizeResult = {
  authorized: boolean;
  user?: {id: number, name: string};
}

export async function getCurrentUser(): Promise<AuthorizeResult> {
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.GET);
  apiRequest.setUrl(URL);

  const response: any = await apiRequest.send();

  return {
    authorized: !!response["found"],
    user: !!response["found"] ? {
      id: response["id"],
      name: response["username"],
    } : undefined,
  };
}
import { ApiRequest, RequestMethod } from "../../request";

const URL = "/api/user/current";

export type AuthorizeResult = {
  authorized: boolean;
  user?: { id: number; name: string; registrationDate: string };
};

export async function getCurrentUser(): Promise<AuthorizeResult> {
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.GET);
  apiRequest.setUrl(URL);

  const response: any = await apiRequest.send();

  return {
    authorized: response.data["authorized"],
    user:
      response.data["authorized"] === true
        ? {
            id: response.data["id"],
            name: response.data["username"],
            registrationDate: response.data["registration_date"]["date"],
          }
        : undefined,
  };
}

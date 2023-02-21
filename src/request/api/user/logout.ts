import { ApiRequest, RequestMethod } from "../../request";

const URL = "/api/user/logout";

export async function logout(): Promise<void> {
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.GET);
  apiRequest.setUrl(URL);
  await apiRequest.send();
}

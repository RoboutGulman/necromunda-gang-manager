import { ApiRequest, RequestMethod } from "../../request";

const URL = "/api/fighter/delete";

export async function deleteFighters(ids: number[]): Promise<boolean> {
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.DELETE);
  apiRequest.setUrl(URL);

  apiRequest.setJsonBody(ids);

  return (await apiRequest.send()).status === 200;
}

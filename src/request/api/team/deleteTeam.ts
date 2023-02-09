import { ApiRequest, RequestMethod } from "../../request";

export async function deleteTeam(id: number): Promise<boolean> {
  const URL = `/api/team/${id}/delete`;
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.DELETE);
  apiRequest.setUrl(URL);

  return (await apiRequest.send()).status === 200;
}

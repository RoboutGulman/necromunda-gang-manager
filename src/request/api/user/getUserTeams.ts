import { ApiRequest, RequestMethod } from "../../request";

export type GetUserTeamsResult = {
  id: number;
  name: string;
  imageUrl: string;
}[];

export async function getUserTeams(id: number): Promise<GetUserTeamsResult> {
  const URL = `/api/user/${id}/teams`;
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.GET);
  apiRequest.setUrl(URL);

  const response: any = await apiRequest.send();

  return response.data.map((faction: any) => ({
    id: faction["id"],
    name: faction["name"],
    imageUrl: faction["imageUrl"],
  }));
}

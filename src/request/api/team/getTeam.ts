import { plainToClass } from "class-transformer";
import { TeamView } from "../../../model/Dto/TeamView";
import { ApiRequest, RequestMethod } from "../../request";

export async function getTeam(id: number): Promise<TeamView> {
  const URL = `/api/team/${id}`;
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.GET);
  apiRequest.setUrl(URL);

  const response: any = await apiRequest.send();

  return plainToClass(TeamView, response.data);
}

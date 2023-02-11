import { plainToClass } from "class-transformer";
import { TeamView } from "../../../model/Dto/TeamView";
import { ApiRequest, RequestMethod } from "../../request";

export type GetTeamResponse = {
  success: boolean;
  teamView: TeamView | undefined;
};

export async function getTeam(id: number): Promise<GetTeamResponse> {
  const URL = `/api/team/${id}`;
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.GET);
  apiRequest.setUrl(URL);

  const response: any = await apiRequest.send();

  return {
    success: response.status === 200,
    teamView:
      response.status === 200
        ? plainToClass(TeamView, response.data)
        : undefined,
  };
}

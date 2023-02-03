import { ApiRequest, RequestMethod } from "../../request";

const URL = "/api/team/create";

export type CreateTeamRequest = {
  name: string;
  startingCredits: number;
  factionId: number;
  userId?: number;
};

export type CreateTeamResponse = {
  isSuccess: boolean;
  createdTeamId: number | undefined;
};

export async function createTeam({
  name,
  startingCredits,
  factionId,
  userId,
}: CreateTeamRequest): Promise<CreateTeamResponse> {
  const apiRequest = new ApiRequest();

  apiRequest.setMethod(RequestMethod.POST);
  apiRequest.setUrl(URL);

  apiRequest.setJsonBody({
    name: name,
    startingCredits: startingCredits,
    factionId: factionId,
    userId: userId,
  });

  const response: any = await apiRequest.send();

  return {
    isSuccess: response.status === 200,
    createdTeamId: response.data["id"],
  };
}

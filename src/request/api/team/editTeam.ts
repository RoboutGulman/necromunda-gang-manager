import { ApiRequest, RequestMethod } from "../../request";

export type EditTeamArguments = {
  teamId: number;
  request: EditTeamRequest;
};

export type EditTeamRequest = {
  name?: string;
  cash?: number;
  reputation?: number;
  description?: string;
  isOutlaw?: boolean;
};

export async function editTeam({
  teamId,
  request
}: EditTeamArguments): Promise<boolean> {
  const URL = `/api/team/${teamId}/edit`;

  const apiRequest = new ApiRequest();

  apiRequest.setMethod(RequestMethod.POST);
  apiRequest.setUrl(URL);

  apiRequest.setJsonBody(request);

  const response: any = await apiRequest.send();

  return response.status === 200;
}

import { ApiRequest, RequestMethod } from "../../request";

type GetTeamCashResponse = {
  success: boolean;
  cash: number | undefined;
};

export async function getTeamCash(
  teamId: number
): Promise<GetTeamCashResponse> {
  const URL = `/api/team/${teamId}/get-cash`;
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.GET);
  apiRequest.setUrl(URL);

  const response: any = await apiRequest.send();

  return {
    success: response.status === 200,
    cash: response.status === 200 ? response.data.cash : undefined,
  };
}

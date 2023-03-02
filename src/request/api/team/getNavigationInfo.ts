import { plainToClass } from "class-transformer";
import { NavigationInfo } from "../../../model/Dto/FighterPageInfo";
import { ApiRequest, RequestMethod } from "../../request";

type GetNavigationInfoResponse = {
  success: boolean;
  navigationInfo: NavigationInfo | undefined;
};

export async function getNavigationInfo(
  teamId: number
): Promise<GetNavigationInfoResponse> {
  const URL = `/api/team/${teamId}/navigation-info`;
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.GET);
  apiRequest.setUrl(URL);

  const response: any = await apiRequest.send();

  return {
    success: response.status === 200,
    navigationInfo:
      response.status === 200
        ? plainToClass(NavigationInfo, response.data)
        : undefined,
  };
}

import { UpgradesAndProfilesInfo } from "../../../model/Dto/UpgradesAndProfilesInfo";
import { plainToClass } from "class-transformer";
import { Fighter } from "../../../model/Dto/Fighter";
import { ApiRequest, RequestMethod } from "../../request";

type GetUpgradesAndProfilesResponse = {
  success: boolean;
  upgradesAndProfilesInfo: UpgradesAndProfilesInfo | undefined;
};

export async function getUpgradesAndProfiles(
  fighterWeaponId: number
): Promise<GetUpgradesAndProfilesResponse> {
  const URL = `/api/fighter-weapon/${fighterWeaponId}/get-upgrades-profiles`;
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.GET);
  apiRequest.setUrl(URL);

  const response: any = await apiRequest.send();

  return {
    success: response.status === 200,
    upgradesAndProfilesInfo:
      response.status === 200
        ? plainToClass(UpgradesAndProfilesInfo, response.data)
        : undefined,
  };
}

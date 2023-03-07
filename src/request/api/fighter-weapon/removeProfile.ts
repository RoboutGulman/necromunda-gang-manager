import { ApiRequest, RequestMethod } from "../../request";

const URL = "/api/fighter-weapon/remove-profile";

export async function removeProfile(
  fighterWeaponId: number,
  profileId: number,
  refundMode: number
): Promise<boolean> {
  const apiRequest = new ApiRequest();
  apiRequest.setMethod(RequestMethod.DELETE);
  apiRequest.setUrl(URL);

  apiRequest.setJsonBody({
    fighterWeaponId: fighterWeaponId,
    profileId: profileId,
    refundMode: refundMode,
  });

  return (await apiRequest.send()).status === 200;
}
